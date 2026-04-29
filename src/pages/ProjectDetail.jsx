import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Badge, Button } from 'react-bootstrap';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../data/projects';
import { getTagStyle } from '../data/skillColors';
import SkillBadge from '../components/SkillBadge';
import AuroraBackground from '../components/AuroraBackground';

// Renders **bold** markdown segments as <strong> within an otherwise plain
// string. Used to emphasize impact numbers in project copy without storing
// JSX in the data file.
function renderBold(str) {
  return str.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('***') && part.endsWith('***')) {
      return <strong key={i} className="brand-strong-shine">{part.slice(3, -3)}</strong>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="brand-strong">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = projects.find(p => p.id === parseInt(id));

  // Where the user came from — used to pick the back button's label and
  // scroll target. Falls back to 'projects' for direct/bookmarked URLs.
  const from = location.state?.from === 'resume' ? 'resume' : 'projects';
  const backLabel = from === 'resume' ? 'Back to timeline' : 'Back to all projects';

  if (!project) return (
    <>
      <AuroraBackground />
      <Container className="py-5 detail-page"><h2>Project not found</h2></Container>
    </>
  );

  return (
    <>
    <AuroraBackground />
    <Container className="py-5 detail-page" style={{ maxWidth: '800px' }}>
      <Button
        variant="link"
        onClick={() => navigate('/', { state: { scrollTo: from } })}
        className="mb-3 p-0 back-btn back-link-gradient"
      >
        <FaArrowLeft /> {backLabel}
      </Button>
      <h1 className="fw-bold"><span className="brand-portfolio-shine">{project.title}</span></h1>
      <p className="lead text-muted">{project.tagline}</p>
      <div className="mb-3">
        {project.tags.map(tag => (
            <SkillBadge key={tag} tag={tag} size="0.85rem" />
        ))}
        </div>

      {project.detailVideo ? (
        <video
          className="project-screenshot project-screenshot--detail"
          src={`${import.meta.env.BASE_URL}${project.detailVideo.replace(/^\//, '')}`}
          controls
          autoPlay
          loop
          muted
          playsInline
          aria-label={project.screenshotAlt || `${project.title} demo`}
        />
      ) : project.screenshot && (
        <img
          className="project-screenshot project-screenshot--detail"
          src={`${import.meta.env.BASE_URL}${project.screenshot.replace(/^\//, '')}`}
          alt={project.screenshotAlt || `${project.title} screenshot`}
          style={project.screenshotAspectRatio ? {
            aspectRatio: project.screenshotAspectRatio,
            height: 'auto',
            maxHeight: 'none',
            objectFit: 'cover',
            objectPosition: 'center',
          } : undefined}
        />
      )}

      <h4 className="mt-4 subheading-gradient">Overview</h4>
      <p>{renderBold(project.description)}</p>

      <h4 className="mt-4 subheading-shine">Highlights</h4>
      <ul className="brand-bullets mb-3">
        {project.highlights.map((h, i) => (
          <li key={i}>{renderBold(h)}</li>
        ))}
      </ul>

      <h4 className="mt-4 subheading-gradient">Challenges</h4>
      {project.challenges.split('\n\n').map((para, i) => (
        <p key={i}>{renderBold(para)}</p>
      ))}

      <h4 className="mt-4 subheading-gradient">Outcome</h4>
      {project.outcome.split('\n\n').map((para, i) => (
        <p key={i}>{renderBold(para)}</p>
      ))}

      <div className="mt-4 d-flex gap-3">
        {project.publication ? (
          <Button variant="primary" href={project.publication} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> Publication
          </Button>
        ) : project.live && (
          <Button variant="primary" href={project.live} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> Live Demo
          </Button>
        )}
        {project.github && (
          <Button variant="dark" href={project.github} target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </Button>
        )}
      </div>
    </Container>
    </>
  );
}

export default ProjectDetail;