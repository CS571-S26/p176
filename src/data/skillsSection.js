// Data for the Skills section pills layout. Intentionally separate from
// skillColors.js (which still drives project-card tag rendering) — the Skills
// section uses a different palette, ordering, and skill list.

export const skillCategories = [
  { id: 'languages',     label: 'Languages',      color: '#2563eb', skills: ['Python', 'Java', 'TypeScript', 'Go', 'JavaScript', 'C/C++', 'SQL'] },
  { id: 'frameworks',    label: 'Frameworks',     color: '#16a34a', skills: ['React', 'FastAPI', 'Spring Boot', 'Flask', 'Express'] },
  { id: 'devops',        label: 'DevOps & Cloud', color: '#ea580c', skills: ['Docker', 'Kubernetes', 'AWS'] },
  { id: 'observability', label: 'Observability',  color: '#dc2626', skills: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Jaeger'] },
  { id: 'databases',     label: 'Databases',      color: '#9333ea', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'] },
  { id: 'ai',            label: 'AI & LLM',       color: '#0891b2', skills: ['Gemini API', 'scikit-learn', 'NLP', 'OpenAI', 'LangChain'] },
  { id: 'other-tools',   label: 'Other Tools',    color: '#64748b', skills: ['Git', 'Google Maps API', 'Google Books API', 'JWT', 'REST', 'Scrum', 'Postman', 'Unit Testing'] },
  { id: 'learning',      label: 'Currently Learning', color: '#ca8a04', skills: ['Databricks', 'Apache Spark', 'Delta Lake', 'MLflow'] },
];

// Discriminated union per skill:
//   { type: 'projects', items: [...names] }   → "FEATURED IN N PROJECT(S)" + project rows
//   { type: 'practice', text: '...' }         → "PRACTICE / LEARNING" + a single description
export const skillProjects = {
  Python:         { type: 'projects', items: ['Prometheon', 'SmartCert', 'MadSnowi'] },
  Java:           { type: 'projects', items: ['BookShelf'] },
  TypeScript:     { type: 'projects', items: ['MadSnowi', 'DevPortfolio'] },
  Go:             { type: 'practice', text: 'Built CLI tools and learning projects' },
  JavaScript:     { type: 'projects', items: ['DevPortfolio', 'MadSnowi', 'Prometheon', 'SmartCert'] },
  'C/C++':        { type: 'practice', text: 'Used extensively in courses and systems programming for 4+ years' },
  React:          { type: 'projects', items: ['DevPortfolio', 'MadSnowi', 'Prometheon', 'SmartCert', 'BadgerMart', 'BadgerChat'] },
  FastAPI:        { type: 'projects', items: ['SmartCert', 'Prometheon'] },
  'Spring Boot':  { type: 'projects', items: ['BookShelf'] },
  Flask:          { type: 'projects', items: ['MadSnowi'] },
  Docker:         { type: 'projects', items: ['Prometheon', 'SmartCert'] },
  Kubernetes:     { type: 'projects', items: ['Prometheon'] },
  'AWS':          { type: 'projects', items: ['Prometheon'] },
  Prometheus:     { type: 'projects', items: ['Prometheon'] },
  Grafana:        { type: 'projects', items: ['Prometheon'] },
  OpenTelemetry:  { type: 'projects', items: ['Prometheon'] },
  Jaeger:         { type: 'projects', items: ['Prometheon'] },
  PostgreSQL:     { type: 'projects', items: ['BookShelf'] },
  MongoDB:        { type: 'projects', items: ['SmartCert'] },
  Redis:          { type: 'projects', items: ['Prometheon'] },
  'Gemini API':   { type: 'projects', items: ['SmartCert'] },
  'scikit-learn': { type: 'projects', items: ['Prometheon'] },
  NLP:            { type: 'projects', items: ['Prometheon', 'MadSnowi', 'SmartCert'] },
  Git:               { type: 'projects', items: ['Prometheon', 'SmartCert', 'BookShelf', 'MadSnowi'] },
  'Google Maps API': { type: 'projects', items: ['MadSnowi'] },
  'Google Books API':{ type: 'projects', items: ['BookShelf'] },
  JWT:               { type: 'projects', items: ['BookShelf', 'Prometheon'] },
  Scrum:             { type: 'projects', items: ['SmartCert'] },
  'LangChain':      { type: 'projects', items: ['Netflix ChatBot'] },
  OpenAI:           { type: 'projects', items: ['Prometheon', 'Netflix ChatBot'] },
  Databricks:      { type: 'practice', text: 'Exploring the Databricks Lakehouse Platform and Delta Lake for big data processing' },
  'Apache Spark':    { type: 'practice', text: 'Learning Apache Spark for big data processing and analytics' },
  'Delta Lake':      { type: 'practice', text: 'Working with Delta Lake for data lake management and optimization' },
  'MLflow':          { type: 'practice', text: 'Using MLflow for tracking experiments and managing the ML lifecycle' },
  'REST':           { type: 'projects', items: ['Prometheon', 'SmartCert', 'BookShelf', 'MadSnowi'] },
  'Postman':        { type: 'projects', items: ['Prometheon', 'SmartCert', 'BookShelf'] },
  'Unit Testing':   { type: 'projects', items: ['Prometheon', 'SmartCert', 'BookShelf'] },
  Supabase:        { type: 'projects', items: ['MadSnowi'] },


};

// Single-letter colored badge per project, used in tooltip rows.
export const projectIcons = {
  Prometheon:   { letter: 'P', color: '#6366f1' },
  SmartCert:    { letter: 'S', color: '#06b6d4' },
  MadSnowi:     { letter: 'M', color: '#10b981' },
  BookShelf:    { letter: 'B', color: '#f59e0b' },
  DevPortfolio: { letter: 'D', color: '#6366f1' },
  BadgerChat:   { letter: 'B', color: '#dc2626' },
  BadgerMart:   { letter: 'B', color: '#f59e0b' },
  'Netflix ChatBot': { letter: 'N', color: '#541600ff' },
};
