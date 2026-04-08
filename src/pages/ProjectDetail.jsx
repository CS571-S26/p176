import { useParams, useNavigate } from 'react-router-dom';
import { Container, Badge, Button, ListGroup } from 'react-bootstrap';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../data/projects';
import { getTagStyle } from '../data/skillColors';
import SkillBadge from '../components/SkillBadge';

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) return <Container className="py-5"><h2>Project not found</h2></Container>;

  return (
    <Container className="py-5" style={{ maxWidth: '800px' }}>
      <Button variant="link" onClick={() => navigate('/')} className="mb-3 p-0">
        <FaArrowLeft /> Back to all projects
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
      <ListGroup variant="flush" className="mb-3">
        {project.highlights.map((h, i) => (
          <ListGroup.Item key={i}>{h}</ListGroup.Item>
        ))}
      </ListGroup>

      <h4 className="mt-4">Challenges</h4>
      <p>{project.challenges}</p>

      <h4 className="mt-4">Outcome</h4>
      <p>{project.outcome}</p>

      <div className="mt-4 d-flex gap-3">
        {project.github && (
          <Button variant="dark" href={project.github} target="_blank">
            <FaGithub /> GitHub
          </Button>
        )}
        {project.live && (
          <Button variant="primary" href={project.live} target="_blank">
            <FaExternalLinkAlt /> Live Demo
          </Button>
        )}
      </div>
    </Container>
  );
}

export default ProjectDetail;