import { useState, useRef } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import TimelineEntry from './TimelineEntry';
import timeline, { timelineYears, datePercent } from '../data/timeline';

const filters = [
  { value: 'All', label: 'All' },
  { value: 'education', label: 'Education' },
  { value: 'experience', label: 'Experience' },
  { value: 'project', label: 'Projects' },
];

function ResumeTimeline({ orientation = 'vertical' }) {
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);

  const filtered = timeline.filter(e => filter === 'All' || e.type === filter);
  const entries = orientation === 'horizontal'
    ? [...filtered].sort(
        (a, b) => (a.endYear - b.endYear) || (a.endMonth - b.endMonth)
      )
    : filtered;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="fw-bold mb-0">Resume</h2>
        <Button variant="primary" href="/resume.pdf" target="_blank" download>
          <FaDownload /> Download PDF
        </Button>
      </div>
      <ButtonGroup className="mb-4 d-flex flex-wrap">
        {filters.map(f => (
          <Button
            key={f.value}
            variant={filter === f.value ? 'primary' : 'outline-primary'}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </ButtonGroup>

      {entries.length === 0 ? (
        <p className="text-muted text-center">No entries match this filter.</p>
      ) : orientation === 'horizontal' ? (
        <div ref={containerRef} className="timeline-container timeline-container--horizontal">
          <div className="timeline-horizontal-inner">
            {timelineYears.map(y => {
              // datePercent clamps to 0 for years before TIMELINE_START.
              // Nudge clamped ticks to 3% so the centered label isn't
              // clipped by the container's left edge.
              const raw = datePercent(y, 1);
              const pos = raw <= 0 ? 3 : raw;
              return (
                <div
                  key={y}
                  className="timeline-year-tick"
                  data-year={y}
                  style={{ left: `${pos}%` }}
                />
              );
            })}
            <div className="timeline-horizontal-line" />
            {entries.map((entry, i) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                orientation="horizontal"
                lane={i % 2 === 0 ? 'top' : 'bottom'}
                leftPercent={datePercent(entry.endYear, entry.endMonth + 0.5)}
                rootRef={containerRef}
              />
            ))}
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="timeline-container timeline-container--vertical">
          <div className="timeline-inner-vertical">
            {entries.map(entry => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                orientation="vertical"
                rootRef={containerRef}
              />
            ))}
            <div className="timeline-line-vertical" aria-hidden="true" />
          </div>
        </div>
      )}
    </>
  );
}

export default ResumeTimeline;
