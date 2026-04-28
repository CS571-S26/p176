import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Badge, Button } from 'react-bootstrap';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../data/projects';
import { getTagStyle } from '../data/skillColors';
import SkillBadge from '../components/SkillBadge';
import AuroraBackground from '../components/AuroraBackground';

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
        className="mb-3 p-0 back-btn"
      >
        <FaArrowLeft /> {backLabel}
      </Button>
      <h1 className="fw-bold">{project.title}</h1>
      <p className="lead text-muted">{project.tagline}</p>
      <div className="mb-3">
        {project.tags.map(tag => (
            <SkillBadge key={tag} tag={tag} size="0.85rem" />
        ))}
        </div>

      <h4 className="mt-4">Overview</h4>
      <p>{project.description}</p>

      <h4 className="mt-4">Highlights</h4>
      <ul className="brand-bullets mb-3">
        {project.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      <h4 className="mt-4">Challenges</h4>
      <p>{project.challenges}</p>

      <h4 className="mt-4">Outcome</h4>
      <p>{project.outcome}</p>

      <div className="mt-4 d-flex gap-3">
        {project.live && (
          <Button variant="primary" href={project.live} target="_blank">
            <FaExternalLinkAlt /> Live Demo
          </Button>
        )}
        {project.github && (
          <Button variant="dark" href={project.github} target="_blank">
            <FaGithub /> GitHub
          </Button>
        )}
      </div>
    </Container>
    </>
  );
}

export default ProjectDetail;