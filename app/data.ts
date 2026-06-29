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

export type DepartmentHead = {
  slug: string;
  revealed: boolean;
  department: string;
  position: string;
  name?: string;
  photo?: string;
  blurb?: string;
  motionIds?: string[];
  email?: string;
  emailSubject?: string;
  defaultMessage?: string;
};

export const DEPARTMENT_HEADS: DepartmentHead[] = [
  {
    slug: "filmla",
    revealed: true,
    department: "FilmLA",
    position: "President & CEO",
    name: "Denise Gutches",
    photo: "", // Add a file to /public (e.g. /denise-gutches.jpg) then put the path here
    blurb:
      "Denise Gutches became CEO of FilmLA on January 1, 2026, after 14 years as the organization's Chief Financial and Operating Officer. FilmLA is the nonprofit film office that handles permitting for the City of Los Angeles under contract with the Board of Public Works. Six of the seven Keep Hollywood Home motions direct FilmLA to take specific action — most of those deadlines have already passed.",
    motionIds: ["25-1498", "25-1500", "25-1501", "25-1502", "25-1509-S1", "25-1512"],
    email: "info@filmla.com",
  },
  {
    slug: "bpw-film-liaison",
    revealed: false,
    department: "Board of Public Works",
    position: "Film Liaison",
  },
  {
    slug: "lapd-film-unit",
    revealed: false,
    department: "LAPD",
    position: "Contract Services / Film Unit",
  },
  {
    slug: "lafd-film-unit",
    revealed: false,
    department: "LAFD",
    position: "Film Unit",
  },
  {
    slug: "ladot",
    revealed: false,
    department: "LADOT",
    position: "General Manager",
  },
  {
    slug: "ewdd",
    revealed: false,
    department: "EWDD",
    position: "General Manager",
  },
];

export function getHeadBySlug(slug: string): DepartmentHead | undefined {
  return DEPARTMENT_HEADS.find((head) => head.slug === slug);
}
