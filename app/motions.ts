// The 7 Keep Hollywood Home motions that PASSED city council unanimously on
// March 4, 2026. Each motion directs city departments to take specific
// actions within specific deadlines. As of mid-2026, most of those deadlines
// have passed without action.

export type Deadline = {
  label: string;       // e.g. "60-day report" or "Ordinance draft"
  date: string;        // ISO date string, e.g. "2026-05-03"
};

export type Motion = {
  id: string;                       // same as council file number
  code: string;                     // displayed council file number
  title: string;
  summary: string;
  responsibleDepartments: string[];
  deadlines: Deadline[];            // empty array if no deadline in motion
  link?: string;                    // link to LA City Clerk record
};

export const MOTIONS: Motion[] = [
  {
    id: "25-1498",
    code: "25-1498",
    title: "Free Micro-Shoot Permits",
    summary:
      "Directs the City Attorney, FilmLA, Board of Public Works, LAPD, LAFD, and LADOT to create — within 60 days — a free, one-page permit for small public-space shoots (10 people or fewer, handheld cameras, no street closures, no generators). The goal: stop pushing students, indie filmmakers, and content creators to neighboring cities that already have these simplified rules.",
    responsibleDepartments: [
      "City Attorney",
      "FilmLA",
      "Board of Public Works",
      "LAPD",
      "LAFD",
      "LADOT",
    ],
    deadlines: [
      { label: "Ordinance draft", date: "2026-05-03" },
    ],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1498",
  },
  {
    id: "25-1500",
    code: "25-1500",
    title: "Controller Audit of City Film Ecosystem and FilmLA Contract",
    summary:
      "Requests the City Controller to conduct an independent audit of LA's entire film permitting system — departmental staffing, interdepartmental coordination, FilmLA's contract performance, and its permitting technology — and recommend fixes. Also creates an annual implementation report (led by the CLA, BPW Film Liaison, CAO, and FilmLA) to track progress on the broader Keep Hollywood Home agenda.",
    responsibleDepartments: [
      "City Controller",
      "Chief Legislative Analyst",
      "BPW Film Liaison",
      "City Administrative Officer",
      "FilmLA",
    ],
    deadlines: [],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1500",
  },
  {
    id: "25-1501",
    code: "25-1501",
    title: "Made in LA Tour, Branding and Business Directory",
    summary:
      "Directs the Office of Tourism, Department of Cultural Affairs, EWDD, and FilmLA to launch — within 90 days — a Made-in-LA initiative: a citywide fan tour of iconic filming locations, a searchable directory of LA-based film vendors and businesses, and a branding campaign celebrating the city's film legacy. (Note: a cost/impact report is now required before this can move forward.)",
    responsibleDepartments: [
      "Office of Tourism",
      "Department of Cultural Affairs",
      "EWDD",
      "FilmLA",
    ],
    deadlines: [
      { label: "Initiative launch", date: "2026-06-02" },
    ],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1501",
  },
  {
    id: "25-1502",
    code: "25-1502",
    title: "Executive Directive 11 Implementation Updates",
    summary:
      "Requires every department covered by Mayor Bass's Executive Directive 11 — which was meant to streamline film permitting — to report back within 45 days on what they've actually done to implement it: workflow changes, staffing changes, performance metrics, and what's holding them back. The Board of Public Works Film Liaison then compiles all the reports into a single citywide summary within 60 days.",
    responsibleDepartments: [
      "LAPD",
      "LAFD",
      "LADOT",
      "Department of Recreation and Parks",
      "Bureau of Street Services",
      "Bureau of Engineering",
      "LADWP",
      "Port of Los Angeles",
      "FilmLA",
      "BPW Film Liaison",
    ],
    deadlines: [
      { label: "Departmental reports", date: "2026-04-18" },
      { label: "Citywide summary", date: "2026-05-03" },
    ],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1502",
  },
  {
    id: "25-1503",
    code: "25-1503",
    title: "Soundstage Certification and Fast-Track Infrastructure Program",
    summary:
      "Within 60 days, LADWP, the Department of Building and Safety, the Department of City Planning, LAFD, and the Board of Public Works were directed to design a fast-track soundstage program — a unified \u201CCertified LA Stage\u201D standard, predictable permitting timelines for new construction, conversions, and expansions, and a designated fast-track zone in key industrial areas. The goal: stop losing stage construction (and the productions that depend on it) to other regions.",
    responsibleDepartments: [
      "LADWP",
      "Department of Building and Safety",
      "Department of City Planning",
      "LAFD",
      "Board of Public Works",
      "Chief Legislative Analyst",
    ],
    deadlines: [
      { label: "Program design", date: "2026-05-03" },
    ],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1503",
  },
  {
    id: "25-1509-S1",
    code: "25-1509-S1",
    title: "Special Conditions Repeal & Unified Filming Framework",
    summary:
      "Within 90 days, Recreation and Parks, LAPD, LADOT, LAFD, and the Bureau of Street Services (with FilmLA's help) were directed to deliver a unified Citywide Filming Conditions Framework — standardizing how departments handle notifications, surveys, monitor requirements, response times, and appeals — and to designate a City Film Liaison at the Board of Public Works to coordinate it all. (Note: the original version would have rescinded existing neighborhood-specific filming conditions; that clause was struck before passage.)",
    responsibleDepartments: [
      "Department of Recreation and Parks",
      "LAPD",
      "LADOT",
      "LAFD",
      "Bureau of Street Services",
      "BPW Film Liaison",
      "FilmLA",
    ],
    deadlines: [
      { label: "Framework report", date: "2026-06-02" },
    ],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1509-S1",
  },
  {
    id: "25-1512",
    code: "25-1512",
    title: "Regional MOUs and COG Alignment",
    summary:
      "Within 180 days, EWDD and FilmLA were directed to negotiate formal agreements with neighboring cities and Councils of Government — coordinating permitting thresholds, sharing best practices for public facilities, aligning business-development strategies, improving regional workforce training, and collaborating on soundstage expansion. A 120-day status report was also required. The aim: productions stop getting stuck navigating wildly different rules across jurisdictional lines within the LA region.",
    responsibleDepartments: [
      "EWDD",
      "FilmLA",
      "Mayor's Office",
    ],
    deadlines: [
      { label: "Status report", date: "2026-07-02" },
      { label: "Regional MOUs", date: "2026-08-31" },
    ],
    link: "https://cityclerk.lacity.org/lacityclerkconnect/index.cfm?fa=ccfi.viewrecord&cfnumber=25-1512",
  },
];

export function getMotionsByIds(ids: string[]): Motion[] {
  return MOTIONS.filter((motion) => ids.includes(motion.id));
}
