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
    revealed: false,
    department: "FilmLA",
    position: "President & CEO",
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
