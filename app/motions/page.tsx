import Link from "next/link";
import { MOTIONS, Deadline } from "../motions";

const COLORS = {
  blue: "#2f58b8",
  blueDeep: "#1f3d8a",
  cream: "#f4f1ec",
  ink: "#1a2238",
  muted: "#6b7280",
  red: "#a3261c",
  redLight: "#fbeae8",
};

export const metadata = {
  title: "Keep Hollywood Home Motions — Stay in LA",
  description:
    "The 7 Keep Hollywood Home motions passed unanimously by LA City Council on March 4, 2026.",
};

// Compute deadline status against today's date. Server-rendered at request time
// so the displayed status stays current without redeploys.
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
  status: DeadlineStatus | "none";
} {
  const { status, days } = statusFor(d.date);
  if (status === "overdue") {
    const n = Math.abs(days);
    return {
      text: `${n} day${n === 1 ? "" : "s"} overdue`,
      status: "overdue",
    };
  }
  if (status === "today") {
    return { text: "Due today", status: "today" };
  }
  return {
    text: `Due in ${days} day${days === 1 ? "" : "s"}`,
    status: "upcoming",
  };
}

function motionHasOverdue(deadlines: Deadline[]): boolean {
  return deadlines.some((d) => statusFor(d.date).status === "overdue");
}

export default function MotionsPage() {
  return (
    <>
      <main className="page">
        <div className="container">
          <div className="topNav">
            <Link href="/" className="backLink">
              ← Back
            </Link>
          </div>

          <header className="pageHeader">
            <img
              src="/STAYinLA_LogoBlue.png"
              alt="Stay in LA"
              className="siteLogo"
            />
            <h1 className="pageTitle">The Keep Hollywood Home Motions</h1>
            <p className="pageIntro">
              Unanimously passed by Los Angeles City Council on March 4, 2026.
              Each motion below directs specific city departments to take
              specific actions on specific timelines. Most of those deadlines
              have come and gone.
            </p>
          </header>

          <ol className="motionsList">
            {MOTIONS.map((motion) => {
              const overdue = motionHasOverdue(motion.deadlines);
              return (
                <li
                  key={motion.id}
                  className={"motionCard" + (overdue ? " motionCardOverdue" : "")}
                >
                  <div className="motionTop">
                    <div className="motionCode">CF {motion.code}</div>
                    {overdue ? (
                      <span className="badgeOverdue">Past due</span>
                    ) : null}
                  </div>

                  <h2 className="motionTitle">{motion.title}</h2>

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
                                  <span className="deadlineLabel">
                                    {d.label}:
                                  </span>{" "}
                                  <span className="deadlineDate">
                                    {formatDate(d.date)}
                                  </span>{" "}
                                  <span
                                    className={
                                      "deadlineStatus deadlineStatus--" +
                                      info.status
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
                </li>
              );
            })}
          </ol>

          <div className="footerNav">
            <Link href="/" className="backLink">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        .page {
          min-height: 100vh;
          background: ${COLORS.cream};
          color: ${COLORS.ink};
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          padding: 24px 20px 64px;
          box-sizing: border-box;
        }

        .topNav {
          margin-bottom: 28px;
        }

        .footerNav {
          margin-top: 36px;
          text-align: center;
        }

        .backLink {
          color: ${COLORS.blue};
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .backLink:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .pageHeader {
          text-align: center;
          margin-bottom: 40px;
        }

        .siteLogo {
          display: block;
          width: clamp(130px, 22vw, 200px);
          height: auto;
          margin: 0 auto 24px;
        }

        .pageTitle {
          font-size: 26px;
          line-height: 1.15;
          font-weight: 600;
          margin: 0 0 14px;
          color: ${COLORS.ink};
          letter-spacing: -0.01em;
        }

        .pageIntro {
          max-width: 580px;
          margin: 0 auto;
          font-size: 15px;
          line-height: 1.6;
          color: ${COLORS.ink};
        }

        .motionsList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .motionCard {
          background: #fff;
          border: 1px solid ${COLORS.blue}26;
          border-radius: 6px;
          padding: 22px;
          position: relative;
        }

        .motionCardOverdue {
          border-left: 4px solid ${COLORS.red};
        }

        .motionTop {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .motionCode {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.muted};
        }

        .badgeOverdue {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: ${COLORS.red};
          color: #fff;
          padding: 3px 8px;
          border-radius: 3px;
        }

        .motionTitle {
          font-size: 20px;
          line-height: 1.2;
          font-weight: 600;
          margin: 0 0 12px;
          color: ${COLORS.ink};
          letter-spacing: -0.005em;
        }

        .motionSummary {
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 18px;
          color: ${COLORS.ink};
        }

        .motionMeta {
          margin: 0 0 16px;
          padding: 14px 0 0;
          border-top: 1px solid ${COLORS.blue}1f;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .metaRow {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metaLabel {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${COLORS.muted};
        }

        .metaValue {
          font-size: 14px;
          line-height: 1.55;
          color: ${COLORS.ink};
          margin: 0;
        }

        .metaMuted {
          color: ${COLORS.muted};
          font-style: italic;
        }

        .deadlineList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .deadlineItem {
          font-size: 14px;
          line-height: 1.55;
        }

        .deadlineLabel {
          color: ${COLORS.muted};
        }

        .deadlineDate {
          color: ${COLORS.ink};
          font-weight: 500;
        }

        .deadlineStatus {
          font-size: 12px;
          font-weight: 600;
          padding: 1px 6px;
          border-radius: 3px;
          margin-left: 4px;
          white-space: nowrap;
        }

        .deadlineStatus--overdue {
          color: ${COLORS.red};
          background: ${COLORS.redLight};
        }

        .deadlineStatus--today {
          color: ${COLORS.blueDeep};
          background: ${COLORS.blue}1f;
        }

        .deadlineStatus--upcoming {
          color: ${COLORS.muted};
          background: transparent;
        }

        .motionLink {
          display: inline-block;
          color: ${COLORS.blue};
          font-size: 13px;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .motionLink:hover {
          color: ${COLORS.blueDeep};
        }

        @media (min-width: 700px) {
          .container {
            padding: 36px 28px 80px;
          }

          .pageHeader {
            margin-bottom: 52px;
          }

          .pageTitle {
            font-size: 34px;
          }

          .pageIntro {
            font-size: 16px;
          }

          .motionCard {
            padding: 26px 28px;
          }

          .motionTitle {
            font-size: 22px;
          }

          .motionSummary {
            font-size: 15.5px;
          }

          .motionMeta {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 18px;
          }
        }
      `}</style>
    </>
  );
}
