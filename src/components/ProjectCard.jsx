import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import { getTagStyle } from '../data/skillColors';
import SkillBadge from './SkillBadge';

function ProjectCard({ project, onVote }) {
  const navigate = useNavigate();

  return (
    <Card className="project-card h-100 shadow-sm" style={{ cursor: 'pointer' }}>
      <Card.Body onClick={() => navigate(`/project/${project.id}`)}>
        <Card.Title className="fw-bold">{project.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{project.tagline}</Card.Subtitle>
        <div className="mb-2">
            {project.tags.map(tag => (
                <SkillBadge key={tag} tag={tag} />
            ))}
        </div>
        <Card.Text className="small">{project.description.substring(0, 120)}...</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <small className="text-muted">Click for deep dive →</small>
        <span
          className="vote-btn"
          onClick={(e) => { e.stopPropagation(); onVote(project.id); }}
          style={{ cursor: 'pointer' }}
        >
          <FaArrowUp /> {project.votes}
        </span>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;