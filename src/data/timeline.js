const timelineTypes = {
  education: {
    color: '#4fc3f7',
    bg: '#e1f5fe',
    label: 'Education',
    icon: 'FaGraduationCap',
  },
  experience: {
    color: '#81c784',
    bg: '#e8f5e9',
    label: 'Experience',
    icon: 'FaBriefcase',
  },
  project: {
    color: '#ffb74d',
    bg: '#fff3e0',
    label: 'Project',
    icon: 'FaCode',
  },
};

const timeline = [
  {
    id: 1,
    type: 'education',
    title: 'B.S. Computer Science',
    subtitle: 'University of Wisconsin–Madison',
    period: 'Aug 2022 – May 2026 (Expected)',
    startYear: 2022,
    startMonth: 8,
    endYear: 2026,
    endMonth: 5,
    description: 'B.S. Computer Science, GPA 3.78. Expected graduation May 2026.',
    highlights: [
      'GPA: 3.78',
      'Based in Madison, WI',
    ],
    expanded: {
      label: 'Relevant Coursework',
      items: [
        'Systems Programming',
        'Data Structures & Algorithms',
        'Computer Architecture',
        'Artificial Intelligence',
        'Machine Learning',
        'Database Management Systems',
        'Software Security',
        'User Interface Design',
        'Algorithm Optimization',
      ],
    },
  },
  {
    id: 2,
    type: 'experience',
    title: 'Backend Engineer Intern',
    subtitle: 'SmartCert (Aramid Technologies)',
    period: 'Sep 2025 – Dec 2025',
    startYear: 2025,
    startMonth: 9,
    endYear: 2025,
    // endMonth shifted from 12 → 10.5 so the 320px card has visible
    // breathing room before the 2026 tick on the horizontal timeline.
    // Actual end date is Dec 2025 (see `period` label on the card).
    endMonth: 10.5,
    description:
      'Cut manual aerospace compliance review time by 75%+ (hours → minutes) by engineering an LLM validation pipeline with Google Gemini. Backend served 1,500+ clients across 20+ countries.',
    highlights: [
      'LLM validation pipeline: prompt engineering, schema enforcement, confidence scoring, cascading fallback',
      'Async Python/FastAPI + MongoDB ingestion for AI-driven audit generation',
      'Enabled onboarding of 55+ new enterprise clients post-launch',
    ],
    link: '/#/experience/1',
  },
  {
    id: 3,
    type: 'project',
    title: 'Prometheon',
    subtitle: 'AI Root Cause Analysis & Chaos Engineering Platform',
    period: 'January 2026',
    startYear: 2026,
    startMonth: 1,
    endYear: 2026,
    // endMonth set to 1.26 so Prometheon's card center lands at 52%
    // of the horizontal timeline. Actual end date is January 2026
    // (see `period` label on the card).
    endMonth: 1.26,
    description:
      'Multi-tenant chaos engineering platform on Kubernetes with per-tenant sandboxes, Toxiproxy fault injection, and ML-based root cause analysis over an OpenTelemetry + Prometheus + Jaeger observability pipeline.',
    link: '/#/project/1',
  },
  {
    id: 4,
    type: 'project',
    title: 'BookShelf',
    subtitle: 'Full-Stack Java Application',
    period: 'October 2025',
    startYear: 2025,
    startMonth: 10,
    endYear: 2025,
    // endMonth shifted from 10 → 9 so the card has more horizontal
    // breathing room from SmartCert's card on the horizontal timeline.
    // Actual end date is October 2025 (see `period` label on the card).
    endMonth: 9,
    description:
      'Library management platform in Spring Boot + React + PostgreSQL. JWT with role-based access control, Google Books API via reactive WebClient, Flyway migrations, Docker.',
    link: '/#/project/3',
  },
  {
    id: 5,
    type: 'project',
    title: 'MadSnowi',
    subtitle: 'Safe Route Optimization Platform',
    period: 'Summer 2025',
    startYear: 2025,
    startMonth: 6,
    endYear: 2025,
    // endMonth set to 7.57 so MadSnowi's center lands at 8.2% of the
    // horizontal timeline for more breathing room from BookShelf. Card's
    // left edge extends past the container's left edge, but the extra
    // space is within the card's border + body padding so the title
    // stays readable. Actual end is Aug 2025 (see `period` label).
    endMonth: 7.57,
    description:
      'Flask + Supabase route optimizer combining traffic, weather, and Wisconsin DOT data for safety-aware routing. AI-powered hazard reporting turns observations into structured incident reports; 40% backend perf improvement from caching + query tuning.',
    link: '/#/project/4',
  },
];

export const timelineYears = [2025, 2026];

// Horizontal timeline date range — cards are positioned by end date as a
// percentage of this span. Span is Jul 2025 → Aug 2026 (13 months) so the
// "2025" tick lands immediately before MadSnowi (the first card) and the
// timeline is focused on recent-grad activity.
export const TIMELINE_START = { year: 2025, month: 7 };
export const TIMELINE_END = { year: 2026, month: 8 };

// Returns the timeline percentage at the START of the given month.
// Accepts fractional months — callers position cards at endMonth + 0.5
// (midpoint of the end month) so SmartCert / Prometheon land visibly on
// either side of the Jan-2026 tick rather than on top of it.
export function datePercent(year, month) {
  const totalMonths =
    (TIMELINE_END.year - TIMELINE_START.year) * 12 +
    (TIMELINE_END.month - TIMELINE_START.month);
  const fromStart =
    (year - TIMELINE_START.year) * 12 + (month - TIMELINE_START.month);
  return Math.max(0, Math.min(100, (fromStart / totalMonths) * 100));
}

export function getTypeStyle(type) {
  const t = timelineTypes[type];
  if (!t) return { color: '#90a4ae', bg: '#eceff1' };
  return { color: t.color, bg: t.bg };
}

export function getTypeLabel(type) {
  return timelineTypes[type]?.label || 'Other';
}

export { timelineTypes };
export default timeline;
