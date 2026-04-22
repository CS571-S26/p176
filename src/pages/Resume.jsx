import { Container } from 'react-bootstrap';
import ResumeTimeline from '../components/ResumeTimeline';

function Resume() {
  return (
    <Container fluid className="py-4 px-4 px-lg-5">
      <ResumeTimeline orientation="horizontal" />
    </Container>
  );
}

export default Resume;
