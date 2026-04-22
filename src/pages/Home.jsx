import { useState } from 'react';
import { Container, Row, Col, Form, ButtonGroup, Button } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import SkillGrid from '../components/SkillGrid';
import ContactForm from '../components/ContactForm';
import Guestbook from '../components/Guestbook';
import ResumeTimeline from '../components/ResumeTimeline';
import projectsData from '../data/projects';

function Home() {
  const [projects, setProjects] = useState(projectsData);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const allTags = ['All', ...new Set(projectsData.flatMap(p => p.tags))];

  const filtered = projects.filter(p => {
    const matchesTag = filter === 'All' || p.tags.includes(filter);
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const handleVote = (id) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
  };

  return (
    <>
      <Hero />

      <section id="projects" className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-4">Projects</h2>
          <Form.Control
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
          />
          <ButtonGroup className="mb-4 d-flex flex-wrap">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={filter === tag ? 'primary' : 'outline-primary'}
                size="sm"
                onClick={() => setFilter(tag)}
              >
                {tag}
              </Button>
            ))}
          </ButtonGroup>
          <Row xs={1} md={2} className="g-4">
            {filtered.map(project => (
              <Col key={project.id}>
                <ProjectCard project={project} onVote={handleVote} />
              </Col>
            ))}
          </Row>
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