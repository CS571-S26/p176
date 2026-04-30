import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

function NavigationBar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const linkRefs = useRef({});
  const navListRef = useRef(null);

  const targetSection = hoveredSection ?? activeSection;

  // Route → activeSection. On '/', the IntersectionObserver below overrides this.
  useEffect(() => {
    const path = location.pathname;
    if (path === '/resume') setActiveSection('resume');
    else if (path.startsWith('/project/')) setActiveSection('projects');
    else if (path.startsWith('/experience/')) setActiveSection('resume');
    else if (path === '/') setActiveSection('hero');
  }, [location.pathname]);

  // Scroll-spy: only runs on Home. The rootMargin carves a narrow active band
  // at the top of the viewport — only one section can occupy it at a time, so
  // the underline never flickers between two.
  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = ['hero', 'projects', 'skills', 'resume', 'contact'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length === 0) return;
        const topmost = intersecting.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        );
        setActiveSection(topmost.target.id);
      },
      { rootMargin: '-90px 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  // Measure the active link inside the nav list and position the indicator.
  // useLayoutEffect runs before paint, so on initial mount the indicator is
  // rendered directly in its final position (no "slide from 0,0" artifact).
  useLayoutEffect(() => {
    const link = linkRefs.current[targetSection];
    const navList = navListRef.current;
    if (!link || !navList) {
      setIndicator(null);
      return;
    }
    const linkRect = link.getBoundingClientRect();
    const navRect = navList.getBoundingClientRect();
    setIndicator({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
    });
  }, [targetSection]);

  // Resize → re-measure (rAF-debounced)
  useEffect(() => {
    let rafId = null;
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const link = linkRefs.current[targetSection];
        const navList = navListRef.current;
        if (!link || !navList) return;
        const linkRect = link.getBoundingClientRect();
        const navRect = navList.getBoundingClientRect();
        setIndicator({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
        });
      });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetSection]);

  const scrollTo = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }}>
          Jatin
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-portfolio">DevPortfolio</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav ref={navListRef} onMouseLeave={() => setHoveredSection(null)}>
            <Nav.Link
              ref={(el) => { linkRefs.current.hero = el; }}
              onClick={() => scrollTo('hero')}
              onMouseEnter={() => setHoveredSection('hero')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              ref={(el) => { linkRefs.current.projects = el; }}
              onClick={() => scrollTo('projects')}
              onMouseEnter={() => setHoveredSection('projects')}
            >
              Projects
            </Nav.Link>
            <Nav.Link
              ref={(el) => { linkRefs.current.skills = el; }}
              onClick={() => scrollTo('skills')}
              onMouseEnter={() => setHoveredSection('skills')}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              ref={(el) => { linkRefs.current.resume = el; }}
              as={Link}
              to="/resume"
              onMouseEnter={() => setHoveredSection('resume')}
            >
              Timeline
            </Nav.Link>
            <Nav.Link
              ref={(el) => { linkRefs.current.contact = el; }}
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => setHoveredSection('contact')}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              ref={(el) => { linkRefs.current.theme = el; }}
              onClick={() => setDarkMode(!darkMode)}
              onMouseEnter={() => setHoveredSection('theme')}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </Nav.Link>
            {indicator && (
              <span
                className="nav-indicator"
                aria-hidden="true"
                style={{
                  transform: `translateX(${indicator.left}px)`,
                  width: `${indicator.width}px`,
                }}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
