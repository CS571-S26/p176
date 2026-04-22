import { useEffect } from 'react';
import { Overlay, Popover, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import skillCategories from '../data/skillColors';

function FilterPopover({ target, show, onHide, selectedTags, onToggleTag, onClearAll }) {
  // ESC key closes the popover. rootClose on the Overlay handles click-outside.
  useEffect(() => {
    if (!show) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onHide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show, onHide]);

  return (
    <Overlay
      target={() => target.current}
      show={show}
      placement="bottom-end"
      rootClose
      onHide={onHide}
      transition
    >
      <Popover className="filter-popover">
        <Popover.Header className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Filter by Skills</span>
          <Button
            variant="link"
            size="sm"
            className="p-0 text-muted text-decoration-none"
            onClick={onHide}
            aria-label="Close filters"
          >
            <FaTimes />
          </Button>
        </Popover.Header>
        <Popover.Body>
          {Object.entries(skillCategories).map(([cat, { color, skills }]) => (
            <div key={cat} className="mb-3">
              <small
                className="fw-bold d-block mb-2"
                style={{ color, letterSpacing: '0.5px' }}
              >
                {cat.toUpperCase()}
              </small>
              <div className="d-flex flex-wrap gap-1">
                {skills.map(skill => {
                  const selected = selectedTags.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      className="filter-chip"
                      aria-pressed={selected}
                      style={{
                        borderColor: color,
                        backgroundColor: selected ? color : 'transparent',
                        color: selected ? '#fff' : color,
                      }}
                      onClick={() => onToggleTag(skill)}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="pt-2 border-top d-flex justify-content-between align-items-center">
            <small className="text-muted">
              {selectedTags.length > 0 ? `${selectedTags.length} selected` : 'None selected'}
            </small>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onClearAll}
              disabled={selectedTags.length === 0}
            >
              Clear all
            </Button>
          </div>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
}

export default FilterPopover;
