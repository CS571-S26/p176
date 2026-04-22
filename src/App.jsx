import { HashRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ExperienceDetail from './pages/ExperienceDetail';
import Resume from './pages/Resume';
import { useState, useEffect, useRef } from 'react';
import './App.css';

// Scroll management on route change:
//   - PUSH (clicking a link into a new page) → scroll to top
//   - POP (browser back/forward) → restore saved scroll for that pathname
//   - `state.restoreScroll` (explicit Back buttons) → behave like POP
//   - `state.scrollTo` (navbar cross-route section scrolling) → no-op here;
//     Home's own useEffect scrolls to that section.
//   - Browser refresh → always start at the top (saved entry wiped on the
//     first effect run when performance.navigation.type === 'reload').
// Saved positions are kept in sessionStorage keyed by pathname; the listener
// is re-attached per pathname so it always writes for the current route.
function ScrollManager() {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  const didInit = useRef(false);

  // Take scroll restoration off the browser so we fully control it
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    // On the first effect run after page load, if the nav was a reload
    // (browser refresh), drop any stale saved scroll so the restore path
    // below falls through to scrollTo(0, 0). React Router reports initial
    // mount as POP, which would otherwise jump to the pre-refresh Y.
    if (!didInit.current) {
      didInit.current = true;
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry?.type === 'reload') {
        sessionStorage.removeItem(`scroll:${pathname}`);
      }
    }

    if (state?.scrollTo) return;
    const shouldRestore = state?.restoreScroll || navigationType === 'POP';
    if (shouldRestore) {
      const saved = sessionStorage.getItem(`scroll:${pathname}`);
      window.scrollTo(0, saved ? parseInt(saved, 10) : 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state, navigationType]);

  return null;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Router>
      <ScrollManager />
      <div className={darkMode ? 'app dark-mode' : 'app'}>
        <NavigationBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/experience/:id" element={<ExperienceDetail />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;