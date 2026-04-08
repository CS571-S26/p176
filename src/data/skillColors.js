const skillCategories = {
  Languages: {
    color: '#4fc3f7',
    bg: '#e1f5fe',
    skills: ['Python', 'Java', 'JavaScript', 'Go', 'TypeScript']
  },
  Frameworks: {
    color: '#81c784',
    bg: '#e8f5e9',
    skills: ['React', 'FastAPI', 'Spring Boot']
  },
  'DevOps & Cloud': {
    color: '#ffb74d',
    bg: '#fff3e0',
    skills: ['Docker', 'Kubernetes', 'AWS']
  },
  'AI & LLM': {
    color: '#1a5b72ff',
    bg: '#b5dbe8ff',
    skills: ['scikit-learn', 'Gemini API', 'OpenAI API']
  },
  Observability: {
    color: '#ef5350',
    bg: '#ffebee',
    skills: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Jaeger']
  },
  Databases: {
    color: '#ce93d8',
    bg: '#f3e5f5',
    skills: ['PostgreSQL', 'MongoDB', 'Supabase']
  },
  'Other Tools': {
    color: '#90a4ae',
    bg: '#eceff1',
    skills: ['Git', 'Flyway', 'Google Maps API']
  }
};

export function getTagStyle(tag) {
  for (const category of Object.values(skillCategories)) {
    if (category.skills.includes(tag)) {
      return { backgroundColor: category.color, color: '#fff', border: `1px solid ${category.color}` };
    }
  }
  return { backgroundColor: '#90a4ae', color: '#fff', border: '1px solid #90a4ae' };
}

export function getTagCategory(tag) {
  for (const [category, data] of Object.entries(skillCategories)) {
    if (data.skills.includes(tag)) return category;
  }
  return 'Other Tools';
}

export default skillCategories;