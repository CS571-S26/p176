import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import SkillGrid from '../components/SkillGrid';
import ContactForm from '../components/ContactForm';
import Guestbook from '../components/Guestbook';
import ResumeTimeline from '../components/ResumeTimeline';
import FilterPopover from '../components/FilterPopover';
import projectsData from '../data/projects';

const VOTES_STORAGE_KEY = 'p176:project-votes';

function Home() {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(VOTES_STORAGE_KEY) || '{}');
      return projectsData.map(p => ({
        ...p,
        votes: saved[p.id] ?? p.votes ?? 0,
      }));
    } catch {
      return projectsData;
    }
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const filterBtnRef = useRef(null);
  const location = useLocation();

  const toggleTag = (tag) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const clearTags = () => setSelectedTags([]);

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    // Wait a frame so the section IDs are actually in the DOM.
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location]);

  const filtered = projects.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some(tag => p.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleVote = (id) => {
    setProjects(prev => {
      const next = prev.map(p =>
        p.id === id ? { ...p, votes: (p.votes || 0) + 1 } : p
      );
      try {
        const votesMap = Object.fromEntries(next.map(p => [p.id, p.votes]));
        localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votesMap));
      } catch {}
      return next;
    });
  };

  return (
    <>
      <Hero />

      <section id="projects" className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-4">Projects</h2>
          <div className="d-flex gap-2 mb-4">
            <Form.Control
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow-1"
            />
            <Button
              ref={filterBtnRef}
              variant={selectedTags.length > 0 ? 'primary' : 'outline-primary'}
              onClick={() => setShowFilters(s => !s)}
              className="position-relative d-flex align-items-center gap-1"
              aria-label="Open filters"
            >
              <IoFilter size={18} /> Filter
              {selectedTags.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute"
                  style={{ top: -6, right: -6 }}
                >
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </div>

          <FilterPopover
            target={filterBtnRef}
            show={showFilters}
            onHide={() => setShowFilters(false)}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
            onClearAll={clearTags}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p className="mb-3">No projects match these filters.</p>
              <Button variant="outline-primary" onClick={clearTags}>Clear filters</Button>
            </div>
          ) : (
            <Row xs={1} md={2} className="g-4">
              {filtered.map(project => (
                <Col key={project.id}>
                  <ProjectCard project={project} onVote={handleVote} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      <section id="skills" className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-4">Skills</h2>
          <SkillGrid />
        </Container>
      </section>

      <section id="resume" className="py-5">
        <Container>
          <ResumeTimeline orientation="vertical" />
          <div className="scroll-hint-wrap">
            <a
              className="scroll-hint"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Scroll to contact section"
            >
              <div className="scroll-hint-box">
                <FaChevronDown />
              </div>
              <span className="scroll-hint-text">Scroll</span>
            </a>
          </div>
        </Container>
      </section>

      <section id="contact" className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-4">Contact</h2>
          <Row>
            <Col md={6}><ContactForm /></Col>
            <Col md={6}><Guestbook /></Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;