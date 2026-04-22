import { Container } from 'react-bootstrap';
import ResumeTimeline from '../components/ResumeTimeline';

function Resume() {
  return (
    <Container className="py-5">
      <ResumeTimeline orientation="horizontal" />
    </Container>
  );
}

export default Resume;
