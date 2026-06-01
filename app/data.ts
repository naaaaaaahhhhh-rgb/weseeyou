// Department heads data.
//
// HOW TO USE THIS FILE:
//
// Each entry below represents one card on the homepage. To "reveal" a
// department head, edit their entry: set `revealed: true` and fill in their
// real `name`, `photo`, `blurb`, `motionIds`, and `email`. To leave them
// unrevealed, keep `revealed: false`.
//
// `department` and `position` are ALWAYS visible on the card — even before
// reveal — so the site can show "the FilmLA President is responsible for X"
// from day one. Only the person's name, face, blurb, and email contact are
// withheld until reveal.
//
// The `slug` is the URL-friendly identifier (e.g. "filmla"). It appears in
// the URL like /filmla. Keep it lowercase and use hyphens. Don't change it
// after sharing — shared links will break.
//
// `motionIds` is the list of which Keep Hollywood Home motions this person
// is responsible for enacting. Use the council file numbers from
// `motions.ts`, e.g. ["25-1498", "25-1502"].

export type DepartmentHead = {
  slug: string;
  revealed: boolean;

  // Always visible (fill these in before reveal):
  department: string;       // e.g. "FilmLA"
  position: string;         // e.g. "President & CEO"

  // Filled in on reveal:
  name?: string;            // e.g. "Jane Doe"
  photo?: string;           // e.g. "/heads/jane-doe.jpg"
  blurb?: string;           // 2-4 sentences about their role and the motions
  motionIds?: string[];     // e.g. ["25-1498", "25-1502"]
  email?: string;           // official city email

  // Optional overrides for the email form:
  emailSubject?: string;
  defaultMessage?: string;
};

// Six departments chosen because they appear most frequently across the 7
// motions. Adjust as needed — verify the exact official position titles and
// the right person to address before flipping `revealed` to true.

export const DEPARTMENT_HEADS: DepartmentHead[] = [
  {
    slug: "filmla",
    revealed: false,
    department: "FilmLA",
    position: "President & CEO",
    // Referenced in: 25-1498, 25-1500, 25-1501, 25-1502, 25-1509-S1, 25-1512
  },
  {
    slug: "bpw-film-liaison",
    revealed: false,
    department: "Board of Public Works",
    position: "Film Liaison",
    // Referenced in: 25-1498, 25-1500, 25-1502, 25-1503, 25-1509-S1
  },
  {
    slug: "lapd-film-unit",
    revealed: false,
    department: "LAPD",
    position: "Contract Services / Film Unit",
    // Referenced in: 25-1498, 25-1500, 25-1502, 25-1509-S1
  },
  {
    slug: "lafd-film-unit",
    revealed: false,
    department: "LAFD",
    position: "Film Unit",
    // Referenced in: 25-1498, 25-1502, 25-1503, 25-1509-S1
  },
  {
    slug: "ladot",
    revealed: false,
    department: "LADOT",
    position: "General Manager",
    // Referenced in: 25-1498, 25-1502, 25-1509-S1
  },
  {
    slug: "ewdd",
    revealed: false,
    department: "EWDD",
    position: "General Manager",
    // Referenced in: 25-1501, 25-1502, 25-1512
  },
];

export function getHeadBySlug(slug: string): DepartmentHead | undefined {
  return DEPARTMENT_HEADS.find((head) => head.slug === slug);
}
