import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FULL_HEADING = "Hi! I'm Jatin";
const TYPE_MS = 90;

function Hero() {
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTyped(FULL_HEADING);
      setTypingDone(true);
      return;
    }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(FULL_HEADING.slice(0, i));
      if (i >= FULL_HEADING.length) {
        clearInterval(iv);
        setTypingDone(true);
      }
    }, TYPE_MS);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="hero" className="hero-section d-flex align-items-center">
      <Container className="text-center">
        <h1 className="display-3 fw-bold hero-heading">
          {typed}
          <span className="hero-cursor" aria-hidden="true">_</span>
        </h1>
        <div className={`hero-reveal${typingDone ? ' hero-reveal--play' : ''}`}>
          <p className="lead mt-3 hero-subtitle">
            Software Engineer · Backend & Full Stack · UW-Madison '26
          </p>
          <p className="text-muted mt-2 hero-tagline">
            I build scalable systems, from chaos engineering platforms to AI-powered compliance tools.
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 hero-actions">
            <Button
              variant="primary"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </Button>
            <Button variant="outline-secondary" href="/resume.pdf" target="_blank">
              Download Resume
            </Button>
          </div>
          <div className="mt-4 d-flex justify-content-center gap-4 fs-4 hero-actions">
            <a href="https://github.com/JatUppal" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/jatin-uppal/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:jatinuppal55@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
