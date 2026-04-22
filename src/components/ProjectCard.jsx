import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import { getTagStyle } from '../data/skillColors';
import SkillBadge from './SkillBadge';

const MAX_VISIBLE_TAGS = 6;

function ProjectCard({ project, onVote }) {
  const navigate = useNavigate();
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const hiddenCount = Math.max(0, project.tags.length - MAX_VISIBLE_TAGS);
  const visibleTags =
    tagsExpanded || hiddenCount === 0
      ? project.tags
      : project.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <Card className="project-card h-100 shadow-sm" style={{ cursor: 'pointer' }}>
      <Card.Body onClick={() => navigate(`/project/${project.id}`, { state: { from: 'projects' } })}>
        <Card.Title className="fw-bold">{project.title}</Card.Title>
        <Card.Subtitle className="text-muted mb-2">{project.tagline}</Card.Subtitle>
        <div className="mb-2">
          {visibleTags.map(tag => (
            <SkillBadge key={tag} tag={tag} />
          ))}
          {hiddenCount > 0 && !tagsExpanded && (
            <button
              type="button"
              className="btn btn-link btn-sm p-0 ms-1 small text-decoration-none align-baseline"
              onClick={(e) => {
                e.stopPropagation();
                setTagsExpanded(true);
              }}
              aria-label={`Show ${hiddenCount} more tag${hiddenCount === 1 ? '' : 's'}`}
            >
              +{hiddenCount} more
            </button>
          )}
          {hiddenCount > 0 && tagsExpanded && (
            <button
              type="button"
              className="btn btn-link btn-sm p-0 ms-1 small text-decoration-none align-baseline"
              onClick={(e) => {
                e.stopPropagation();
                setTagsExpanded(false);
              }}
            >
              Show less
            </button>
          )}
        </div>
        <Card.Text className="small">{project.description.substring(0, 120)}...</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <Link
          to={`/project/${project.id}`}
          state={{ from: 'projects' }}
          className="small fw-semibold text-primary text-decoration-none"
          onClick={(e) => e.stopPropagation()}
        >
          Click for deep dive →
        </Link>
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