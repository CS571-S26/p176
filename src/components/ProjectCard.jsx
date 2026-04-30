import { useState } from 'react';
import { Card, OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowUp, FaExternalLinkAlt } from 'react-icons/fa';
import { getTagStyle } from '../data/skillColors';
import SkillBadge from './SkillBadge';

const MAX_VISIBLE_TAGS = 6;

// Renders **bold** markdown segments as <strong> within an otherwise plain
// string. Used to emphasize impact numbers in project copy without storing
// JSX in the data file.
function renderBold(str) {
  return str.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="brand-strong">{part.slice(2, -2)}</strong>
      : part
  );
}

function ProjectCard({ project, onVote, hasClicked = false }) {
  const navigate = useNavigate();
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [jumping, setJumping] = useState(false);

  const voteBtnClass = [
    'vote-btn',
    !hasClicked && 'vote-btn--unclicked',
    jumping && 'vote-btn--jumping',
  ].filter(Boolean).join(' ');

  const hiddenCount = Math.max(0, project.tags.length - MAX_VISIBLE_TAGS);
  const visibleTags =
    tagsExpanded || hiddenCount === 0
      ? project.tags
      : project.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <Card className="project-card h-100" style={{ cursor: 'pointer' }}>
      <span className="border-beam" aria-hidden="true" />
      <Card.Body onClick={() => navigate(`/project/${project.id}`, { state: { from: 'projects' } })}>
        <Card.Title className="fw-bold">
          {project.live ? (
            <OverlayTrigger
              placement="top"
              trigger={['hover', 'focus']}
              delay={{ show: 200, hide: 100 }}
              overlay={
                <Popover className="link-preview-popover" id={`preview-${project.id}`}>
                  <Popover.Body>
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
                      alt={`${project.title} preview`}
                    />
                  </Popover.Body>
                </Popover>
              }
            >
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="title-external-link"
              >
                <span className="brand-portfolio-shine">{project.title}</span>
              </a>
            </OverlayTrigger>
          ) : (
            <span className="brand-portfolio-shine">{project.title}</span>
          )}
        </Card.Title>
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
        {project.screenshot && (
          <img
            className="project-screenshot"
            src={`${import.meta.env.BASE_URL}${project.screenshot.replace(/^\//, '')}`}
            alt={project.screenshotAlt || `${project.title} screenshot`}
            style={project.screenshotAspectRatio ? {
              aspectRatio: project.screenshotAspectRatio,
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center',
            } : undefined}
          />
        )}
        <Card.Text className="small">{renderBold(project.description)}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center flex-wrap" style={{ gap: '7rem' }}>
          <Link
            to={`/project/${project.id}`}
            state={{ from: 'projects' }}
            className="small fw-semibold brand-portfolio brand-portfolio-shine text-decoration-none"
            onClick={(e) => e.stopPropagation()}
          >
            Click for deep dive →
          </Link>
          {project.publication && (
            <a
              href={project.publication}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="publication-pill"
            >
              <span>See publication</span>
              <FaExternalLinkAlt size={9} />
            </a>
          )}
        </div>
        <span
          className={voteBtnClass}
          onClick={(e) => {
            e.stopPropagation();
            setJumping(true);
            onVote(project.id);
          }}
          onAnimationEnd={() => setJumping(false)}
          style={{ cursor: 'pointer' }}
        >
          <FaArrowUp /> {project.votes}
        </span>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;