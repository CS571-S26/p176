const experience = [
  {
    id: 1,
    title: 'Backend Engineer Intern',
    company: 'SmartCert (Aramid Technologies)',
    location: 'Green Bay, WI',
    period: 'September 2025 – December 2025',
    tagline: 'AI-powered aerospace compliance & audit platform',
    overview:
      'SmartCert is an enterprise compliance platform that automates review of aerospace certification documents against FAA and industry regulatory standards. Manual review historically required engineers to cross-reference dense specifications against regulatory text — hours per document. I led the backend architecture for an LLM-driven validation pipeline that cut that review time from hours to minutes.',
    team:
      'Sole backend engineer; mentor-guided; collaborated with one frontend engineer on a GitFlow-based sprint cadence.',
    tags: ['Python', 'FastAPI', 'MongoDB', 'Google Gemini', 'Docker', 'REST', 'Git', 'Scrum'],
    impact: [
      'Cut manual compliance review time by 75%+ (hours → minutes) via an LLM validation pipeline.',
      'Backend served 1,500+ manufacturing clients across 20+ countries.',
      'Enabled onboarding of 55+ new enterprise clients post-launch.',
      'Detailed throughput / latency numbers available on request.',
    ],
    highlights: [
      'Engineered an LLM validation pipeline with Google Gemini, integrating prompt engineering, schema enforcement, confidence scoring, and cascading fallback logic.',
      'Led backend architecture of an async Python/FastAPI system and MongoDB ingestion pipelines for AI-driven audit generation.',
      'Built background audit workflows surfacing per-run pass/fail rates, confidence distributions, and failure summaries behind secure REST APIs — reducing QA triage from manual log review to a single dashboard view.',
      'Designed a Gemini-powered natural language interface over certification results, enabling non-technical QA teams to query audit data and retrieve supporting evidence without writing database queries.',
      'Containerized and performance-tuned all backend services with Docker, optimizing async I/O for concurrent Gemini API calls and high-volume document processing.',
    ],
    technicalDecisions: [
      {
        title: 'Async FastAPI for an I/O-bound workload',
        detail:
          'Certification document processing is dominated by Gemini API calls and MongoDB writes — both network-bound. A sync framework would block the worker pool under any real load. FastAPI\'s async-first design keeps the worker pool free while long-running Gemini calls are in flight.',
      },
      {
        title: 'MongoDB over a relational store',
        detail:
          'Compliance document schemas vary widely across aircraft categories and regulatory frameworks. A rigid relational schema would require migrations per new category; MongoDB\'s flexible document model fit the shape of the data and cut the cost of expanding into new compliance verticals.',
      },
      {
        title: 'Wrapping the sync Gemini SDK with asyncio.to_thread',
        detail:
          'The Gemini Python SDK is synchronous; naive use inside FastAPI would block the event loop. Wrapping calls in asyncio.to_thread offloads them to a thread pool while keeping handlers fully async. Combined with structured JSON schema extraction, base64 PDF encoding for input, and chunked batching for token-limit handling, this produced consistent structured output even on large certification documents.',
      },
    ],
    links: {
      github: null,
      external: null,
      note: 'SmartCert is internal to Aramid Technologies — no public repository or writeup. Detailed technical references available on request.',
    },
  },
];

export default experience;
