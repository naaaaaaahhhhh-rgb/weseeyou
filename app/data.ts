// Department heads data.
//
// HOW TO USE THIS FILE:
//
// Each entry below represents one card on the homepage. To "reveal" a
// department head, edit their entry: set `revealed: true` and fill in their
// real name, title, photo, blurb, motions, and email. To leave them as a
// mystery, keep `revealed: false`.
//
// The `slug` is the URL-friendly version of their name (e.g. "bob-jones").
// It will appear in the URL like /bob-jones once they are revealed. Keep it
// lowercase, use hyphens, and don't change it after reveal (it would break
// any links that have been shared).
//
// `motionIds` is the list of which Keep Hollywood Home motions this person is
// responsible for enacting. Use the council file numbers from `motions.ts`,
// e.g. ["25-1498", "25-1502"].

export type DepartmentHead = {
  slug: string;
  revealed: boolean;
  // Filled in on reveal:
  name?: string;
  title?: string;       // e.g. "Director, LA Department of City Planning"
  department?: string;  // e.g. "Department of City Planning"
  photo?: string;       // path to photo file in /public, e.g. "/heads/bob-jones.jpg"
  blurb?: string;       // 2-4 sentences about what this person's job is and why they matter
  motionIds?: string[]; // which motions they are responsible for, e.g. ["25-1498", "25-1502"]
  email?: string;       // their official city email
  // Optional: the email subject and pre-filled message specific to this person.
  // If left blank, a default will be used.
  emailSubject?: string;
  defaultMessage?: string;
};

export const DEPARTMENT_HEADS: DepartmentHead[] = [
  {
    slug: "head-1",
    revealed: true,
    name: "Placeholder Name",
    title: "Placeholder Title",
    department: "Placeholder Department",
    photo: "", // leave blank for now — will use a generic placeholder
    blurb:
      "This is placeholder content. When this department head is revealed, replace this text with 2-4 sentences explaining what their job is, what they're responsible for enacting, and why holding them accountable matters.",
    motionIds: ["25-1498"],
    email: "placeholder@lacity.org",
  },
  {
    slug: "head-2",
    revealed: false,
  },
  {
    slug: "head-3",
    revealed: false,
  },
  {
    slug: "head-4",
    revealed: false,
  },
  {
    slug: "head-5",
    revealed: false,
  },
  {
    slug: "head-6",
    revealed: false,
  },
];

export function getHeadBySlug(slug: string): DepartmentHead | undefined {
  return DEPARTMENT_HEADS.find((head) => head.slug === slug);
}
