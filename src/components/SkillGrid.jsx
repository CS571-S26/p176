import { Row, Col, ProgressBar } from 'react-bootstrap';
import skillCategories from '../data/skillColors';

const skillLevels = {
  'Python': 90, 'Java': 87, 'JavaScript': 84, 'Go': 60, 'TypeScript': 70,
  'React': 80, 'FastAPI': 85, 'Spring Boot': 75,
  'Docker': 88, 'Kubernetes': 84, 'AWS': 75,
  'Prometheus': 80, 'Grafana': 80, 'OpenTelemetry': 75, 'Jaeger': 70,
  'PostgreSQL': 80, 'MongoDB': 75,
  'Git': 90, 'Flyway': 65, 'Supabase': 60, 'Google Maps API': 55, 'Gemini API': 80, 'OpenAI API': 75, 'scikit-learn': 65,
  'NLP': 80, 'Redis': 70, 'JWT': 90, 'Scrum': 85, 'Flask': 70
};

function SkillGrid() {
  return (
    <Row>
      {Object.entries(skillCategories).map(([category, { color, skills }]) => (
        <Col md={6} className="mb-4" key={category}>
          <h5 className="fw-bold" style={{ color }}>{category}</h5>
          {skills.map(skill => (
            <div key={skill} className="mb-2">
              <div className="d-flex justify-content-between">
                <small>{skill}</small>
                <small>{skillLevels[skill]}%</small>
              </div>
              <ProgressBar
                now={skillLevels[skill]}
                style={{ height: '8px' }}
                variant="custom"
                className="skill-bar"
              />
              <style>{`
                .skill-bar .progress-bar { background-color: ${color} !important; }
              `}</style>
            </div>
          ))}
        </Col>
      ))}
    </Row>
  );
}

export default SkillGrid;