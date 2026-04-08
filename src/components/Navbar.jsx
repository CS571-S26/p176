import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

function NavigationBar({ darkMode, setDarkMode }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }}>
          Jay | DevPortfolio
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => scrollTo('hero')}>Home</Nav.Link>
            <Nav.Link onClick={() => scrollTo('projects')}>Projects</Nav.Link>
            <Nav.Link onClick={() => scrollTo('skills')}>Skills</Nav.Link>
            <Nav.Link onClick={() => scrollTo('resume')}>Resume</Nav.Link>
            <Nav.Link onClick={() => scrollTo('contact')}>Contact</Nav.Link>
            <Nav.Link onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;