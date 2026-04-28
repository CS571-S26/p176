import { Container } from 'react-bootstrap';
import ResumeTimeline from '../components/ResumeTimeline';
import AuroraBackground from '../components/AuroraBackground';

function Resume() {
  return (
    <>
      <AuroraBackground />
      <Container fluid className="py-4 px-4 px-lg-5 resume-page">
        <ResumeTimeline orientation="horizontal" />
      </Container>
    </>
  );
}

export default Resume;
