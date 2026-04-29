const projects = [
  {
    id: 1,
    title: "Prometheon",
    tagline: "AI Root Cause Analysis & Chaos Engineering Platform",
    description:
      "A multi-tenant chaos engineering platform on Kubernetes. Users define their system and microservices, deploy isolated per-tenant sandboxes via a namespace lifecycle API, and run failure experiments with real time AI root cause analysis over an OpenTelemetry + Prometheus + Jaeger observability pipeline.",
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
      "Engineered a sandbox manager using the Kubernetes Python client to provision isolated namespaces per tenant with RBAC, NetworkPolicy isolation, and auto-injected Toxiproxy, spinning up full service meshes in under 15 seconds.",
      "Developed an end-to-end observability pipeline (OpenTelemetry + Prometheus + Jaeger-backed RCA) processing 100+ traces per chaos experiment to identify failure patterns with ranked confidence scores.",
      "Launched a full-stack platform (FastAPI, React, PostgreSQL, Redis, JWT auth) with a 3-step sandbox creation wizard supporting custom Docker images, up to 10 services and 15 connections per sandbox, and configurable resource tiers.",
    ],
    challenges:
      "The hardest part was building the sandbox provisioning pipeline. Each user gets a dedicated Kubernetes namespace with ResourceQuotas, NetworkPolicies, and dynamically generated service deployments, all orchestrated through the Kubernetes Python client. The challenge was getting Toxiproxy wired correctly between services: instead of injecting a sidecar, I deploy Toxiproxy as a standalone service and rewrite each upstream's environment variables to route through it, so every service to service connection becomes injectable without the services knowing. Getting the port allocation and env var generation right for arbitrary user defined topologies (up to 10 services, 15 connections) was the trickiest part.\n\nThe second challenge was the observability pipeline. With OpenTelemetry traces flowing from every service in every sandbox simultaneously, I needed the RCA engine to isolate traces belonging to a specific sandbox. I solved this by appending the sandbox ID to each service name in the OTel config, then filtering Jaeger queries and Prometheus metrics by that suffix. The spanmetrics connector converts traces into Prometheus metrics automatically, but getting the PromQL filters and Grafana dashboard variables to scope correctly per-sandbox took significant iteration.",
    outcome:
      "Deployed to AWS EKS with CloudFront HTTPS, live at prometheon.run. The platform provisions isolated sandbox environments in under 15 seconds, processes 100+ traces per chaos experiment, and surfaces ranked root cause analysis with confidence scores, reducing failure diagnosis from hours of manual log review to seconds of automated analysis.",
    github: "https://github.com/JatUppal/AI-Adaptive-Sandbox",
    live: "https://prometheon.run",
    votes: 0,
  },
  {
    id: 2,
    title: "SmartCert",
    tagline: "AI Aerospace Compliance Platform",
    description:
      "AI compliance platform that processes aerospace certification PDFs through Google Gemini, automatically extracting material data, validating against industry specifications (ASTM, AMS, ISO), and scoring confidence on every check. Built with async Python/FastAPI and MongoDB, reducing manual compliance review from hours to minutes **(75%+)**. See the Experience page for the full technical deep dive.",
    image: "/SmarCert.png",
    screenshot: "/SmarCert.png",
    screenshotAlt:
      "SmartCert platform screenshot showing the aerospace certification document review interface with AI-extracted compliance findings and confidence scores.",
    tags: ["Python", "JavaScript", "FastAPI", "React", "Docker", "MongoDB", "Gemini API", "NLP", "REST", "Postman", "Unit Testing", "Git", "Scrum"],
    highlights: [
      "Engineered an LLM validation pipeline with prompt engineering, schema enforcement, confidence scoring, and cascading fallback logic.",
      "Built an AI chat feature allowing users to ask Gemini follow-up questions about specific certificates, with full conversation history and verification context.",
      "Implemented evidence highlighting that maps AI-extracted findings directly onto PDF pages using normalized bounding box coordinates, so reviewers can visually verify every check.",
      "Designed an async email sharing system for sending validated full compliance reports to suppliers with details, priority levels, and full audit logging.",
      "Async Python/FastAPI + MongoDB serving **1,500+** manufacturing clients across **20+** countries.",
    ],
    challenges:
      "The biggest challenge was PDF text extraction. We started with traditional OCR using pdfminer, but aerospace certificates come in every format, clean digital PDFs, scanned copies, handwritten signatures, tables mixed with free text across **50+** pages. Every new document type broke our parsing logic, creating an endless cycle of edge-case handling.\n\nI raised this with my senior engineer and we pivoted to Google Gemini, which reads raw PDF bytes natively, eliminating the entire OCR layer. But Gemini's SDK is synchronous, blocking for **10–30 seconds** per call. I wrapped it in asyncio.to_thread to keep the event loop responsive, then built a fallback system with retry logic, compact prompts for token-limit failures, and response validation to make it production-reliable.",
    outcome:
      "Reduced manual compliance review time by ***75%+*** ***(hours to minutes)***, enabling onboarding of **55+** manufacturing clients across **20+** countries. Owned all backend features as the sole backend engineer for this new AI product at SmartCert.",
    github: null,
    live: "https://www.smartcert.tech/",
    publication: "https://obe.wisc.edu/case-studies/smartcert-driving-innovation-and-student-success/",
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
    detailVideo: "/BookShelf_Demo.mp4",
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
      "The most difficult part of this project was designing the book import flow to be fully idempotent, when a user imports from Google Books, the system checks for existing records by both ISBN and volume ID, fills in missing metadata without overwriting existing data, and handles retries gracefully so duplicates are never created. Getting the ordering of those checks right while keeping the database constraints as a safety net for edge cases took the most careful thinking.",
    outcome: "Built a fully functional full-stack application with JWT authentication, role based access control, and Google Books API integration. Users can create accounts, build and manage their personal book collections, write reviews, track reading progress, and import book metadata automatically. The backend is structured into clean controller, service, and repository layers with Flyway managing all database migrations.",
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
