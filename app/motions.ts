// The Keep Hollywood Home motions that have already PASSED city council
// but are not being enacted. This list is referenced by department head pages
// to show which motions each person is responsible for implementing.
//
// REPLACE THE PLACEHOLDER CONTENT BELOW with the real motion details once
// you have them.

export type Motion = {
  id: string;        // short ID used to link department heads to motions
  code: string;      // official motion code (e.g. "25-0123")
  title: string;
  summary: string;
  link?: string;     // optional link to motion text or a related video
};

export const MOTIONS: Motion[] = [
  {
    id: "KHH-1",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 1",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
  {
    id: "KHH-2",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 2",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
  {
    id: "KHH-3",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 3",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
  {
    id: "KHH-4",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 4",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
  {
    id: "KHH-5",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 5",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
  {
    id: "KHH-6",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 6",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
  {
    id: "KHH-7",
    code: "PLACEHOLDER",
    title: "Placeholder Motion 7",
    summary: "Placeholder summary. Replace with real motion details once available.",
  },
];

export function getMotionsByIds(ids: string[]): Motion[] {
  return MOTIONS.filter((motion) => ids.includes(motion.id));
}
