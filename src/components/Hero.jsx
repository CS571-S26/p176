import { Container, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Hero() {
  return (
    <section id="hero" className="hero-section d-flex align-items-center">
      <Container className="text-center">
        <h1 className="display-3 fw-bold">Hi, I'm Jay</h1>
        <p className="lead mt-3">
          Software Engineer · Backend & Full Stack · UW-Madison '26
        </p>
        <p className="text-muted mt-2">
          I build scalable systems, from chaos engineering platforms to AI-powered compliance tools.
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3">
          <Button variant="primary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            View Projects
          </Button>
          <Button variant="outline-secondary" href="/resume.pdf" target="_blank">
            Download Resume
          </Button>
        </div>
        <div className="mt-4 d-flex justify-content-center gap-4 fs-4">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="mailto:your@email.com"><FaEnvelope /></a>
        </div>
      </Container>
    </section>
  );
}

export default Hero;