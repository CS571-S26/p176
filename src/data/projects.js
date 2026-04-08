const projects = [
  {
    id: 1,
    title: "Prometheon",
    tagline: "Multi-tenant chaos engineering & observability platform",
    description: "A production-grade Kubernetes platform for chaos engineering with real-time observability. Users define services, inject failures, and analyze root causes through an integrated ML pipeline.",
    image: "/prometheon.png",
    tags: ["Python", "React", "Kubernetes", "Docker",  "OpenAI API", "FastAPI", "Prometheus", "Grafana", "OpenTelemetry"],
    highlights: [
      "Per-user sandbox isolation on EKS",
      "Full OTel spanmetrics pipeline (traces → Prometheus → Grafana)",
      "ML-powered RCA with AUC 1.0 on controlled data",
      "Custom service configuration wizard"
    ],
    challenges: "Implementing per-user sandbox isolation while managing Kubernetes ResourceQuotas and handling Toxiproxy failures at scale.",
    outcome: "Deployed to AWS EKS with CloudFront HTTPS, serving live at prometheon.run",
    github: "https://github.com/your-repo",
    live: "https://prometheon.run",
    votes: 0
  },
  {
    id: 2,
    title: "SmartCert",
    tagline: "AI-powered aerospace compliance platform",
    description: "An async document processing platform that uses Google Gemini to analyze aerospace certification documents against regulatory standards.",
    image: "/smartcert.png",
    tags: ["React", "FastAPI", "MongoDB", "Python", "Gemini API"],
    highlights: [
      "Async architecture with FastAPI + Motor",
      "Gemini SDK integration with thread pooling",
      "Sprint-based GitFlow with mentor collaboration",
      "Sole backend engineer"
    ],
    challenges: "Designing an async pipeline that could handle large document processing without blocking, while integrating the Gemini SDK efficiently.",
    outcome: "Production-ready compliance analysis tool used by Aramid Technologies.",
    github: "https://github.com/your-repo",
    live: null,
    votes: 0
  },
  {
    id: 3,
    title: "BookShelf",
    tagline: "Full-stack library management application",
    description: "A Java Spring Boot application with React frontend for managing book collections with role-based access control.",
    image: "/bookshelf.png",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Flyway"],
    highlights: [
      "RBAC with Spring Security",
      "Flyway database migrations",
      "RESTful API design",
      "React frontend with search and filtering"
    ],
    challenges: "Implementing clean role-based access control with Flyway-managed schema evolution.",
    outcome: "Fully functional CRUD app with admin and user roles.",
    github: "https://github.com/your-repo",
    live: null,
    votes: 0
  },
  {
    id: 4,
    title: "MadSnowi",
    tagline: "Real-time snow conditions and trail tracker",
    description: "A React/TypeScript application using Supabase Edge Functions for real-time weather and trail condition data.",
    image: "/madsnowi.png",
    tags: ["React", "Python", "TypeScript", "Supabase", "PostgreSQL", "Google Maps API"],
    highlights: [
      "Supabase Edge Functions for serverless backend",
      "Google Maps + OpenWeather API integration",
      "Real-time condition updates",
      "TypeScript throughout"
    ],
    challenges: "Integrating multiple external APIs while keeping the Supabase edge functions performant.",
    outcome: "Live trail condition tracker with interactive map.",
    github: "https://github.com/your-repo",
    live: null,
    votes: 0
  }
];

export default projects;