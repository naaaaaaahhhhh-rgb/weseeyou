"use client";

import { useState, useEffect } from "react";
import { Motion, Deadline } from "../motions";

const COLORS = {
  blue: "#2f58b8",
  blueDeep: "#1f3d8a",
  blueFade: "#7a8fc2",
  cream: "#f4f1ec",
  red: "#a3261c",
  redLight: "#fbeae8",
};

type DeadlineStatus = "overdue" | "today" | "upcoming";

function statusFor(date: string): { status: DeadlineStatus; days: number } {
  const deadline = new Date(date + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days < 0) return { status: "overdue", days };
  if (days === 0) return { status: "today", days: 0 };
  return { status: "upcoming", days };
}

function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function deadlineLabel(d: Deadline): {
  text: string;
  status: DeadlineStatus;
} {
  const { status, days } = statusFor(d.date);
  if (status === "overdue") {
    const n = Math.abs(days);
    return { text: `${n} day${n === 1 ? "" : "s"} overdue`, status: "overdue" };
  }
  if (status === "today") return { text: "Due today", status: "today" };
  return {
    text: `Due in ${days} day${days === 1 ? "" : "s"}`,
    status: "upcoming",
  };
}

function motionHasOverdue(deadlines: Deadline[]): boolean {
  return deadlines.some((d) => statusFor(d.date).status === "overdue");
}

function MotionCard({
  motion,
  defaultOpen,
}: {
  motion: Motion;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const overdue = motionHasOverdue(motion.deadlines);

  return (
    <article className={"motionCard" + (overdue ? " motionCardOverdue" : "")}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="motionToggle"
        aria-expanded={open}
      >
        <div className="motionToggleInner">
          <div className="motionTop">
            <span className="motionCode">CF {motion.code}</span>
            {overdue ? <span className="badgeOverdue">Past due</span> : null}
          </div>
          <h2 className="motionTitle">{motion.title}</h2>
        </div>
        <span
          className={"chevron" + (open ? " chevronOpen" : "")}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open ? (
        <div className="motionContent">
          <p className="motionSummary">{motion.summary}</p>

          <dl className="motionMeta">
            <div className="metaRow">
              <dt className="metaLabel">Responsible</dt>
              <dd className="metaValue">
                {motion.responsibleDepartments.join(", ")}
              </dd>
            </div>

            <div className="metaRow">
              <dt className="metaLabel">Deadline</dt>
              <dd className="metaValue">
                {motion.deadlines.length === 0 ? (
                  <span className="metaMuted">No deadline set</span>
                ) : (
                  <ul className="deadlineList">
                    {motion.deadlines.map((d, i) => {
                      const info = deadlineLabel(d);
                      return (
                        <li key={i} className="deadlineItem">
                          <span className="deadlineLabel">{d.label}:</span>{" "}
                          <span className="deadlineDate">
                            {formatDate(d.date)}
                          </span>{" "}
                          <span
                            className={
                              "deadlineStatus deadlineStatus--" + info.status
                            }
                          >
                            {info.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </dd>
            </div>
          </dl>

          {motion.link ? (
            <a
              href={motion.link}
              target="_blank"
              rel="noreferrer"
              className="motionLink"
            >
              View on LA City Clerk →
            </a>
          ) : null}
        </div>
      ) : null}

      <style>{`
        .motionCard {
          background: ${COLORS.cream};
          border: 1px solid ${COLORS.blue}33;
          border-radius: 6px;
          margin-bottom: 12px;
          overflow: hidden;
        }
        .motionCardOverdue { border-left: 4px solid ${COLORS.red}; }

        .motionToggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          color: inherit;
        }
        .motionToggle:hover { background: rgba(47, 88, 184, 0.04); }

        .motionToggleInner { flex: 1; min-width: 0; }

        .motionTop {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .motionCode {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.blueFade};
        }

        .badgeOverdue {
          display: inline-block;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: ${COLORS.red};
          color: #fff;
          padding: 2px 7px;
          border-radius: 3px;
        }

        .motionTitle {
          font-size: 16px;
          line-height: 1.25;
          font-weight: 600;
          margin: 0;
          color: ${COLORS.blueDeep};
        }

        .chevron {
          color: ${COLORS.blue};
          margin-left: 12px;
          display: inline-flex;
          transition: transform 0.2s ease;
        }
        .chevronOpen { transform: rotate(180deg); }

        .motionContent {
          padding: 0 18px 18px;
          border-top: 1px solid ${COLORS.blue}1f;
          margin-top: 0;
        }

        .motionSummary {
          font-size: 14.5px;
          line-height: 1.6;
          margin: 14px 0 14px;
          color: ${COLORS.blueDeep};
        }

        .motionMeta {
          margin: 0 0 14px;
          padding: 12px 0 0;
          border-top: 1px solid ${COLORS.blue}1f;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .metaRow { display: flex; flex-direction: column; gap: 3px; }

        .metaLabel {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.blueFade};
        }

        .metaValue {
          font-size: 13.5px;
          line-height: 1.55;
          color: ${COLORS.blueDeep};
          margin: 0;
        }

        .metaMuted {
          color: ${COLORS.blueFade};
          font-style: italic;
        }

        .deadlineList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .deadlineItem { font-size: 13.5px; line-height: 1.55; }
        .deadlineLabel { color: ${COLORS.blueFade}; }
        .deadlineDate { color: ${COLORS.blueDeep}; font-weight: 500; }

        .deadlineStatus {
          font-size: 11.5px;
          font-weight: 600;
          padding: 1px 5px;
          border-radius: 3px;
          margin-left: 2px;
          white-space: nowrap;
        }
        .deadlineStatus--overdue { color: ${COLORS.red}; background: ${COLORS.redLight}; }
        .deadlineStatus--today { color: ${COLORS.blue}; background: ${COLORS.blue}1f; }
        .deadlineStatus--upcoming { color: ${COLORS.blueFade}; background: transparent; }

        .motionLink {
          display: inline-block;
          color: ${COLORS.blue};
          font-size: 13px;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .motionLink:hover { color: ${COLORS.blueDeep}; }

        @media (min-width: 700px) {
          .motionToggle { padding: 18px 22px; }
          .motionCode { font-size: 11px; }
          .motionTitle { font-size: 17.5px; }
          .motionContent { padding: 0 22px 20px; }
          .motionSummary { font-size: 15px; margin-top: 16px; }
          .motionMeta {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 16px;
          }
          .metaRow { gap: 4px; }
          .deadlineItem { font-size: 14px; }
        }
      `}</style>
    </article>
  );
}

export default function MotionList({ motions }: { motions: Motion[] }) {
  // We use a 3-state ready signal: null = not yet checked viewport.
  // Only render cards once we know the viewport, so each MotionCard mounts
  // exactly once with the correct defaultOpen and useState locks in correctly.
  const [defaultOpen, setDefaultOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 699px)").matches;
    setDefaultOpen(!isMobile);
  }, []);

  // Show skeleton while waiting for viewport check (avoids flash).
  if (defaultOpen === null) {
    return (
      <ol className="motionsListSkeleton" aria-hidden="true">
        {motions.map((m) => (
          <li key={m.id} className="skeletonItem" />
        ))}
        <style>{`
          .motionsListSkeleton {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .skeletonItem {
            background: ${COLORS.cream};
            border: 1px solid ${COLORS.blue}33;
            border-radius: 6px;
            margin-bottom: 12px;
            height: 64px;
          }
        `}</style>
      </ol>
    );
  }

  return (
    <ol className="motionsList">
      {motions.map((m) => (
        <MotionCard key={m.id} motion={m} defaultOpen={defaultOpen} />
      ))}
      <style>{`
        .motionsList { list-style: none; padding: 0; margin: 0; }
      `}</style>
    </ol>
  );
}
