import { useState, useRef } from 'react';
import { skillCategories, skillProjects, projectIcons } from '../data/skillsSection';

const TOOLTIP_HALF_WIDTH = 130;
const VIEWPORT_MARGIN = 12;

function ProjectIcon({ project }) {
  const meta = projectIcons[project] ?? { letter: project[0] || '?', color: '#94a3b8' };
  return (
    <span className="proj-icon" style={{ backgroundColor: meta.color }} aria-hidden="true">
      {meta.letter}
    </span>
  );
}

function SkillTooltip({ skill, align }) {
  const entry = skillProjects[skill];
  if (!entry) return null;

  return (
    <div className={`skill-tooltip skill-tooltip--${align}`} role="tooltip">
      {entry.type === 'projects' ? (
        <>
          <div className="skill-tooltip__label">
            FEATURED IN {entry.items.length} PROJECT{entry.items.length !== 1 ? 'S' : ''}
          </div>
          <ul className="skill-tooltip__list">
            {entry.items.map((p) => (
              <li key={p} className="skill-tooltip__row">
                <ProjectIcon project={p} />
                <span className="skill-tooltip__name">{p}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="skill-tooltip__label">PRACTICE / LEARNING</div>
          <p className="skill-tooltip__practice">{entry.text}</p>
        </>
      )}
      <span className="skill-tooltip__triangle" aria-hidden="true" />
    </div>
  );
}

function SkillPill({ skill, color, isPython, isActive, tooltipAlign, onEnter, onLeave, pillRef }) {
  return (
    <span
      ref={pillRef}
      className={`skill-pill${isPython ? ' skill-pill--python' : ''}${isActive ? ' skill-pill--active' : ''}`}
      style={{ backgroundColor: color }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
    >
      <span className="skill-pill__label">{skill}</span>
      {isActive && <SkillTooltip skill={skill} align={tooltipAlign} />}
    </span>
  );
}

const VISIBLE_LIMIT = 6;

function SkillsPillsSection() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [tooltipAlign, setTooltipAlign] = useState('center');
  const [expanded, setExpanded] = useState(() => new Set());
  const pillRefs = useRef({});

  const toggleCategory = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleEnter = (skill) => {
    const el = pillRefs.current[skill];
    if (el) {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      if (center - TOOLTIP_HALF_WIDTH < VIEWPORT_MARGIN) {
        setTooltipAlign('left');
      } else if (center + TOOLTIP_HALF_WIDTH > window.innerWidth - VIEWPORT_MARGIN) {
        setTooltipAlign('right');
      } else {
        setTooltipAlign('center');
      }
    }
    setActiveSkill(skill);
  };

  const handleLeave = () => setActiveSkill(null);

  return (
    <div className="skills-pills-section">
      <header className="skills-pills-section__header">
        <h2>Skills</h2>
        <p>Hover any skill to see where it shows up in my work.</p>
      </header>

      {skillCategories.map((cat) => (
        <section key={cat.id} className="skill-category">
          <header className="skill-category__header">
            <span className="skill-category__dot" style={{ backgroundColor: cat.color }} aria-hidden="true" />
            <span className="skill-category__label">{cat.label}</span>
            <span className="skill-category__count">
              {cat.skills.length === 0
                ? '(coming soon)'
                : `(${cat.skills.length} skill${cat.skills.length !== 1 ? 's' : ''})`}
            </span>
          </header>
          {cat.skills.length === 0 ? (
            <p className="skill-category__empty">More to come soon…</p>
          ) : (
            <div className="skill-category__pills">
              {(() => {
                const isExpanded = expanded.has(cat.id);
                const hasOverflow = cat.skills.length > VISIBLE_LIMIT;
                const visibleSkills = hasOverflow && !isExpanded
                  ? cat.skills.slice(0, VISIBLE_LIMIT)
                  : cat.skills;
                const hiddenCount = cat.skills.length - VISIBLE_LIMIT;
                return (
                  <>
                    {visibleSkills.map((skill) => (
                      <SkillPill
                        key={skill}
                        skill={skill}
                        color={cat.color}
                        isPython={skill === 'Python'}
                        isActive={activeSkill === skill}
                        tooltipAlign={tooltipAlign}
                        onEnter={() => handleEnter(skill)}
                        onLeave={handleLeave}
                        pillRef={(el) => { pillRefs.current[skill] = el; }}
                      />
                    ))}
                    {hasOverflow && (
                      <button
                        type="button"
                        className="skill-pill skill-pill--toggle"
                        onClick={() => toggleCategory(cat.id)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? 'Show less' : `View more (+${hiddenCount})`}
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default SkillsPillsSection;
