import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { FaArrowLeft, FaBriefcase } from 'react-icons/fa';
import experience from '../data/experience';
import SkillBadge from '../components/SkillBadge';

function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = experience.find(e => e.id === parseInt(id));

  if (!role) {
    return (
      <Container className="py-5">
        <h2>Experience not found</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <Button
        variant="link"
        onClick={() => navigate('/', { state: { scrollTo: 'resume' } })}
        className="mb-3 p-0"
      >
        <FaArrowLeft /> Back to resume
      </Button>

      <div className="d-flex align-items-center mb-2" style={{ color: '#81c784' }}>
        <FaBriefcase className="me-2" />
        <small className="text-uppercase fw-semibold" style={{ letterSpacing: '0.5px' }}>
          Experience
        </small>
      </div>
      <h1 className="fw-bold mb-1">{role.title}</h1>
      <h5 className="text-muted mb-1">{role.company}</h5>
      <div className="text-muted mb-3">
        {role.location} · {role.period}
      </div>
      <p className="lead">{role.tagline}</p>

      <div className="mb-4">
        {role.tags.map(tag => (
          <SkillBadge key={tag} tag={tag} size="0.85rem" />
        ))}
      </div>

      <h4 className="mt-4">The problem</h4>
      <p>{role.overview}</p>

      <h4 className="mt-4">My role</h4>
      <p>{role.team}</p>

      <h4 className="mt-4">Impact</h4>
      <ListGroup variant="flush" className="mb-3">
        {role.impact.map((item, i) => (
          <ListGroup.Item key={i}>{item}</ListGroup.Item>
        ))}
      </ListGroup>

      <h4 className="mt-4">Key technical decisions</h4>
      {role.technicalDecisions.map((d, i) => (
        <div key={i} className="mb-3">
          <h6 className="fw-bold mb-1">{d.title}</h6>
          <p className="mb-0">{d.detail}</p>
        </div>
      ))}

      <h4 className="mt-4">What I built</h4>
      <ListGroup variant="flush" className="mb-3">
        {role.highlights.map((h, i) => (
          <ListGroup.Item key={i}>{h}</ListGroup.Item>
        ))}
      </ListGroup>

      {role.links?.note && (
        <p className="text-muted fst-italic mt-4 small">{role.links.note}</p>
      )}
    </Container>
  );
}

export default ExperienceDetail;
