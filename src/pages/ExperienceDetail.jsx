import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaBriefcase, FaExternalLinkAlt } from 'react-icons/fa';
import experience from '../data/experience';
import SkillBadge from '../components/SkillBadge';
import AuroraBackground from '../components/AuroraBackground';

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

function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = experience.find(e => e.id === parseInt(id));

  if (!role) {
    return (
      <>
        <AuroraBackground />
        <Container className="py-5 detail-page">
          <h2>Experience not found</h2>
        </Container>
      </>
    );
  }

  return (
    <>
    <AuroraBackground />
    <Container className="py-5 detail-page" style={{ maxWidth: '800px' }}>
      <Button
        variant="link"
        onClick={() => navigate('/', { state: { scrollTo: 'resume' } })}
        className="mb-3 p-0 back-btn back-link-gradient"
      >
        <FaArrowLeft /> Back to timeline
      </Button>

      <div className="d-flex align-items-center mb-2" style={{ color: '#81c784' }}>
        <FaBriefcase className="me-2" />
        <small className="text-uppercase fw-semibold" style={{ letterSpacing: '0.5px' }}>
          Experience
        </small>
      </div>
      <h1 className="fw-bold mb-1"><span className="brand-portfolio-shine">{role.title}</span></h1>
      <h5 className="mb-1 metallic-blue">{role.company}</h5>
      <div className="experience-meta mb-3">
        {role.location} · {role.period}
      </div>
      <p className="lead">{role.tagline}</p>

      <div className="mb-4">
        {role.tags.map(tag => (
          <SkillBadge key={tag} tag={tag} size="0.85rem" />
        ))}
      </div>

      <h4 className="mt-4 subheading-gradient">The problem</h4>
      <p>{role.overview}</p>

      <h4 className="mt-4 subheading-gradient">My role</h4>
      <p>{role.team}</p>

      <h4 className="mt-4 subheading-shine">Impact</h4>
      <ul className="brand-bullets mb-3">
        {role.impact.map((item, i) => (
          <li key={i}>{renderBold(item)}</li>
        ))}
      </ul>

      <h4 className="mt-4 subheading-gradient">Key technical decisions</h4>
      {role.technicalDecisions.map((d, i) => (
        <div key={i} className="mb-3">
          <h6 className="fw-bold mb-1">{d.title}</h6>
          <p className="mb-0">{d.detail}</p>
        </div>
      ))}

      <h4 className="mt-4 subheading-gradient">What I built</h4>
      <ul className="brand-bullets mb-3">
        {role.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      {role.links?.publication && (
        <div className="mt-4 d-flex gap-3">
          <Button variant="primary" href={role.links.publication} target="_blank" rel="noreferrer">
            <FaExternalLinkAlt /> Publication
          </Button>
        </div>
      )}

      {role.links?.note && (
        <p className="text-muted fst-italic mt-4 small">{role.links.note}</p>
      )}
    </Container>
    </>
  );
}

export default ExperienceDetail;
