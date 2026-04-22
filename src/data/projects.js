const projects = [
  {
    id: 1,
    title: "Prometheon",
    tagline: "AI Root Cause Analysis & Chaos Engineering Platform",
    description:
      "A multi-tenant chaos engineering platform on Kubernetes. Users define their microservice topologies, deploy isolated per-tenant sandboxes via a namespace lifecycle API, and run failure experiments with real-time root cause analysis over an OpenTelemetry + Prometheus + Jaeger pipeline.",
    image: "/prometheon.png",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "Kubernetes",
      "Docker",
      "PostgreSQL",
      "Redis",
      "OpenTelemetry",
      "Prometheus",
      "Jaeger",
      "OpenAI API",
      "scikit-learn",
      "JavaScript",
      "Git",
    ],
    highlights: [
      "Architected a multi-tenant chaos engineering platform on Kubernetes with user-defined microservice topologies and isolated sandboxes for failure experiments.",
      "Engineered a sandbox manager using the Kubernetes Python client to provision isolated namespaces per tenant with RBAC, NetworkPolicy isolation, and auto-injected Toxiproxy — spinning up full service meshes in under 15 seconds.",
      "Developed an end-to-end observability pipeline (OpenTelemetry + Prometheus + Jaeger-backed RCA) processing 100+ traces per chaos experiment to identify failure patterns with ranked confidence scores.",
      "Launched a full-stack platform (FastAPI, React, PostgreSQL, Redis, JWT auth) with a 3-step sandbox creation wizard supporting custom Docker images, up to 10 services and 15 connections per sandbox, and configurable resource tiers.",
    ],
    challenges:
      "Per-tenant sandbox isolation on shared Kubernetes — coordinating namespaces, ResourceQuotas, and NetworkPolicy without cross-tenant leakage while keeping spin-up time under 15 seconds. Handling Toxiproxy auto-injection and trace correlation across dozens of microservices per sandbox.",
    outcome:
      "Deployed to AWS EKS behind CloudFront HTTPS, live at prometheon.run.",
    github: null,
    live: "https://prometheon.run",
    votes: 0,
  },
  {
    id: 2,
    title: "SmartCert",
    tagline: "AI-powered aerospace compliance platform",
    description:
      "Async document-processing backend that uses Google Gemini to analyze aerospace certification documents against regulatory standards. Cut manual compliance review from hours to minutes. (See the Experience page for the deep dive — this was my SmartCert internship role.)",
    image: "/smartcert.png",
    tags: ["Python", "FastAPI", "MongoDB", "Google Gemini", "Docker", "React", "JavaScript", "Git", "Scrum"],
    highlights: [
      "Engineered an LLM validation pipeline with prompt engineering, schema enforcement, confidence scoring, and cascading fallback logic.",
      "Async Python/FastAPI + MongoDB serving 1,500+ manufacturing clients across 20+ countries.",
      "Cut manual compliance review time by 75%+ (hours → minutes).",
      "Enabled onboarding of 55+ new enterprise clients post-launch.",
    ],
    challenges:
      "Designing an async pipeline that could handle large document processing without blocking, while integrating a sync Gemini SDK efficiently under token-limit and rate constraints.",
    outcome:
      "Production platform at Aramid Technologies. See the /experience/1 page for role, technical decisions, and ownership detail.",
    github: null,
    live: null,
    votes: 0,
  },
  {
    id: 3,
    title: "BookShelf",
    tagline: "Full-stack library management application",
    description:
      "A Java Spring Boot application with React frontend for managing book collections, reading status, and reviews. Layered architecture (Controller / Service / Repository / Entity), JWT-based RBAC, Google Books API integration, and Flyway schema migrations.",
    image: "/bookshelf.png",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Flyway", "Docker", "JWT", "Git"],
    highlights: [
      "Implemented JWT authentication with role-based access control, securing REST endpoints via a custom Spring Security filter chain.",
      "Integrated the Google Books API using reactive WebClient for non-blocking metadata retrieval and catalog enrichment.",
      "Engineered paginated query endpoints and idempotent import logic for duplicate detection and bulk catalog operations.",
      "Ensured data consistency at scale through Flyway schema migrations and Docker containerization.",
    ],
    challenges:
      "Clean RBAC with Flyway-managed schema evolution, plus idempotent bulk imports that survive retries without creating duplicates.",
    outcome: "Fully functional CRUD app with admin and user roles.",
    github: "https://github.com/JatUppal/BookShelf",
    live: null,
    votes: 0,
  },
  {
    id: 4,
    title: "MadSnowi",
    tagline: "Safe Route Optimization Platform",
    description:
      "A Flask + Supabase (PostgreSQL) + Google Maps API platform combining traffic, weather, and Wisconsin DOT data into safety-aware routing. An AI-powered hazard reporting feature turns short user observations into structured incident reports with location context.",
    image: "/madsnowi.png",
    tags: ["Python", "Flask", "Supabase", "PostgreSQL", "Google Maps API", "NLP", "TypeScript", "React", "JavaScript", "Git"],
    highlights: [
      "Safety scoring system that ranks and visualizes hazardous road segments in real time, improving route decisions under adverse conditions.",
      "AI-powered hazard reporting: short user observations → structured incident reports using location context and NLP.",
      "40% backend performance improvement via Flask API caching and Supabase/PostgreSQL query optimization.",
      "Integrated traffic, weather, and Wisconsin DOT data into a single safety-aware routing engine.",
    ],
    challenges:
      "Integrating multiple external data sources (traffic, weather, DOT) with real-time performance constraints, and keeping Supabase safety-scoring queries fast under load.",
    outcome: "Live trail and road condition tracker with interactive map and community-driven safety updates.",
    github: "https://github.com/JatUppal/MadSnowi",
    live: null,
    votes: 0,
  },
];

export default projects;
