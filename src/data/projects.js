const projects = [
  {
    id: 1,
    title: "Prometheon",
    tagline: "AI Root Cause Analysis & Chaos Engineering Platform",
    description:
      "A multi-tenant chaos engineering platform on Kubernetes. Users define their system and microservices, deploy isolated per-tenant sandboxes via a namespace lifecycle API, and run failure experiments with real time root cause analysis over an OpenTelemetry + Prometheus + Jaeger observability pipeline.",
    image: "/og-image.png",
    screenshot: "/demo_p1.png",
    screenshotAlt:
      "Prometheon dashboard screenshot showing the chaos engineering experiment view with a microservice topology diagram, OpenTelemetry trace timeline, and ranked root-cause analysis results.",
    tags: [
      "Python",
      "JavaScript",
      "FastAPI",
      "React",
      "Docker",
      "Kubernetes",
      "AWS",
      "PostgreSQL",
      "Redis",
      "scikit-learn",
      "NLP",
      "OpenAI",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Jaeger",
      "JWT",
      "REST",
      "Postman",
      "Unit Testing",
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
    github: "https://github.com/JatUppal/AI-Adaptive-Sandbox",
    live: "https://prometheon.run",
    votes: 0,
  },
  {
    id: 2,
    title: "SmartCert",
    tagline: "AI-powered aerospace compliance platform",
    description:
      "Async document processing backend that uses Google Gemini to analyze aerospace certification documents against regulatory standards. Cut manual compliance review from hours to minutes (75%). (See the Experience page for the deep dive).",
    image: "/SmarCert.png",
    screenshot: "/SmarCert.png",
    screenshotAlt:
      "SmartCert platform screenshot showing the aerospace certification document review interface with AI-extracted compliance findings and confidence scores.",
    tags: ["Python", "JavaScript", "FastAPI", "React", "Docker", "MongoDB", "Gemini API", "NLP", "REST", "Postman", "Unit Testing", "Git", "Scrum"],
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
    live: "https://www.smartcert.tech/",
    votes: 0,
  },
  {
    id: 3,
    title: "BookShelf",
    tagline: "Full-stack library management application",
    description:
      "A Java Spring Boot application with React frontend for managing book collections, reading status, and reviews. Layered architecture (Controller / Service / Repository / Entity), secure JWT based role based access control, Google Books API integration, and Flyway schema migrations.",
    image: "/demo-library.png",
    screenshot: "/demo-library.png",
    screenshotAlt:
      "BookShelf application screenshot showing the personal library catalog view with book covers, reading status badges, and JWT-protected admin actions.",
    tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Flyway", "Docker", "Google Books API", "JWT", "REST", "Postman", "Unit Testing", "Git"],
    highlights: [
      "Implemented JWT authentication with role based access control, securing REST endpoints via a custom Spring Security filter chain.",
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
      "A Flask + Supabase + Google Maps API platform combining traffic, weather, and Wisconsin DOT data into safety-aware routing. An AI hazard reporting feature turns short user observations into structured incident reports with location context.",
    image: "/mad_demo_new.png",
    screenshot: "/mad_demo_new.png",
    screenshotAlt:
      "MadSnowi platform screenshot showing the safety-aware route map with hazard overlays, weather/traffic layers, and AI-generated incident reports for Wisconsin roads.",
    tags: ["Python", "JavaScript", "TypeScript", "React", "Flask", "PostgreSQL", "Supabase", "NLP", "Google Maps API", "REST", "Git"],
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
