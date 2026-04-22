import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

function NavigationBar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Off-Home: navigate to Home and hand the scroll target to Home's
      // useEffect via router state. Home will scroll once its sections
      // are mounted.
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" sticky="top">
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: 'bold' }}>
          Jatin | DevPortfolio
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => scrollTo('hero')}>Home</Nav.Link>
            <Nav.Link onClick={() => scrollTo('projects')}>Projects</Nav.Link>
            <Nav.Link onClick={() => scrollTo('skills')}>Skills</Nav.Link>
            <Nav.Link as={Link} to="/resume">Resume</Nav.Link>
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