import { useState, useEffect, useRef } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { FaGraduationCap, FaBriefcase, FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getTypeStyle, getTypeLabel, timelineTypes } from '../data/timeline';

const iconMap = {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
};

function TimelineEntry({ entry, rootRef, orientation = 'vertical', lane, leftPercent }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const style = getTypeStyle(entry.type);
  const Icon = iconMap[timelineTypes[entry.type]?.icon];
  const hasExpanded = !!entry.expanded;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      {
        threshold: 0.2,
        root: rootRef?.current || null,
      }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootRef]);

  const entryClass = `timeline-entry${
    orientation === 'horizontal' ? ` timeline-entry--horizontal timeline-entry--${lane || 'top'}` : ''
  }${visible ? ' visible' : ''}`;

  const entryStyle =
    orientation === 'horizontal' && leftPercent != null
      ? { left: `${leftPercent}%` }
      : undefined;

  return (
    <div ref={ref} className={entryClass} style={entryStyle}>
      {Icon && (
        <div className="timeline-dot" style={{ background: style.color }}>
          <Icon size={16} />
        </div>
      )}
      <Card
        className="timeline-entry-card shadow-sm"
        style={{ borderLeftColor: style.color, borderLeftWidth: '4px', borderLeftStyle: 'solid' }}
      >
        <Card.Body>
          <div className="mb-2">
            <small className="text-muted text-uppercase" style={{ letterSpacing: '0.5px' }}>
              {getTypeLabel(entry.type)}
            </small>
          </div>
          <Card.Title className="fw-bold mb-1">{entry.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{entry.subtitle}</Card.Subtitle>
          <div className="small text-muted mb-2">{entry.period}</div>
          <Card.Text>{entry.description}</Card.Text>
          {entry.highlights && (
            <ul className="small mb-2 ps-3">
              {entry.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          )}

          {hasExpanded && (
            <>
              <Collapse in={expanded}>
                <div>
                  <div className="mt-3 pt-3 border-top">
                    <div className="fw-semibold small mb-2">{entry.expanded.label}</div>
                    <ul className="small mb-0 ps-3">
                      {entry.expanded.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Collapse>
              <button
                type="button"
                className="btn btn-link btn-sm p-0 mt-2 text-decoration-none"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                style={{ color: style.color }}
              >
                {expanded ? (
                  <>
                    <FaChevronUp size={10} /> Show less
                  </>
                ) : (
                  <>
                    <FaChevronDown size={10} /> Show {entry.expanded.label.toLowerCase()}
                  </>
                )}
              </button>
            </>
          )}

          {entry.link && (
            <div className="mt-2">
              <a href={entry.link} className="small fw-semibold">
                See details →
              </a>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default TimelineEntry;
