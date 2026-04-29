const experience = [
  {
    id: 1,
    title: 'Backend Engineer Intern',
    company: 'SmartCert (Aramid Technologies)',
    location: 'Green Bay, WI',
    period: 'September 2025 – December 2025',
    tagline: 'AI Aerospace Compliance & Audit Platform',
    overview:
      'Every material that goes into an aircraft comes with a certification PDF from the supplier proving it meets regulatory standards. These documents contain chemical compositions, mechanical test results, traceability data, and inspector signatures. Before any material can be used, a QA engineer has to identify the applicable specification standard, look up the acceptable limits, cross-check every value against those limits, verify signatures, and document their findings. For a single 50+ page certificate, this takes 1–2 hours. Multiply that across dozens of certificates arriving daily from suppliers worldwide, and compliance teams were spending entire days just reading PDFs and comparing numbers. The company wanted to see if AI could automate this without sacrificing the accuracy and traceability that aerospace regulations demand.',
    team:
      'Sole backend engineer for this AI prototype, brought on to build the backend from scratch. Worked under the guidance of a senior engineers mentor and collaborated with  frontend engineers and product managers, following Scrum two week sprint cycles.',
    tags: ['Python', 'FastAPI', 'MongoDB', 'Docker', 'NLP', 'Gemini API', 'REST', 'Git', 'Scrum'],
    impact: [
      'Cut manual compliance review time by **75%+** ***(hours → minutes)*** via an LLM validation pipeline.',
      'Backend served **1,500+** manufacturing clients across **20+** countries.',
      'Enabled onboarding of **55+** new enterprise clients post-launch.',
      'Detailed throughput / latency numbers available on request.',
    ],
    highlights: [
      'Engineered an LLM validation pipeline with Google Gemini, integrating prompt engineering, schema enforcement, confidence scoring, and cascading fallback logic.',
      'Led backend architecture of an async Python/FastAPI system and MongoDB ingestion pipelines for AI audit results.',
      'Built background audit workflows surfacing per-run pass/fail rates, confidence distributions, and failure summaries behind secure REST APIs, reducing QA triage from manual log review to a single dashboard view.',
      'Designed a Gemini natural language chat interface over certification results, enabling non-technical QA teams to query audit data and retrieve supporting evidence without writing database queries.',
      'Containerized and performance-tuned all backend services with Docker, optimizing async I/O for concurrent Gemini API calls and high volume document processing.',
    ],
    technicalDecisions: [
      {
        title: 'Async FastAPI for an I/O-bound workload',
        detail:
          'Certification document processing is dominated by Gemini API calls and MongoDB writes. A sync framework would block the worker pool under any real load by blocking on I/O. FastAPI\'s async native design keeps the worker pool free while long running Gemini calls are in flight.',
      },
      {
        title: 'Gemini PDF processing over traditional OCR',
        detail:
          'We initially used pdfminer for text extraction, but aerospace certificates vary wildly: clean digital PDFs, scanned copies, handwritten signatures, mixed tables across 50+ pages. Every new format broke parsing logic, creating endless edge-case handling. Gemini processes raw PDF bytes natively, reading text, scanned content, and visual elements in a single API call. This eliminated the entire OCR layer and gave us flexible, accurate extraction without format specific parsing code.',
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
      publication: 'https://obe.wisc.edu/case-studies/smartcert-driving-innovation-and-student-success/',
      note: 'SmartCert is internal to Aramid Technologies — no public repository. Detailed technical references available on request.',
    },
  },
];

export default experience;
