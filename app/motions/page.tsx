import Link from "next/link";
import { MOTIONS } from "../motions";

const COLORS = {
  blue: "#2f58b8",
  cream: "#f4f1ec",
};

export const metadata = {
  title: "Keep Hollywood Home Motions — Stay in LA",
  description:
    "The 7 Keep Hollywood Home motions passed unanimously by LA City Council on March 4, 2026.",
};

export default function MotionsPage() {
  return (
    <>
      <main className="page">
        <div className="container">
          <div className="topNav">
            <Link href="/" className="backLink">
              ← Back to home
            </Link>
          </div>

          <header className="header">
            <div className="logoLock">
              <img
                src="/STAYinLA_LogoBlue.png"
                alt="Stay in LA"
                className="siteLogo"
              />
            </div>
            <h1 className="pageTitle">The 7 Keep Hollywood Home Motions</h1>
            <p className="pageIntro">
              Unanimously passed by Los Angeles City Council on March 4, 2026.
              Each motion below directs specific city departments to take
              specific actions, on specific timelines. Most of those deadlines
              have come and gone.
            </p>
          </header>

          <div className="motionsList">
            {MOTIONS.map((motion) => (
              <article key={motion.id} className="motionCard">
                <div className="motionHeader">
                  <div className="motionCode">CF {motion.code}</div>
                  <h2 className="motionTitle">{motion.title}</h2>
                </div>

                <p className="motionSummary">{motion.summary}</p>

                <div className="motionMeta">
                  <div className="metaBlock">
                    <div className="metaLabel">Responsible</div>
                    <div className="metaValue">
                      {motion.responsibleDepartments.join(" · ")}
                    </div>
                  </div>

                  {motion.deadline ? (
                    <div className="metaBlock">
                      <div className="metaLabel">Deadline</div>
                      <div className="metaValue">{motion.deadline}</div>
                    </div>
                  ) : null}
                </div>

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
              </article>
            ))}
          </div>

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
          color: ${COLORS.blue};
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }

        .container {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          padding: 20px 16px 40px;
          box-sizing: border-box;
        }

        .topNav {
          margin-bottom: 18px;
        }

        .footerNav {
          margin-top: 24px;
          text-align: center;
        }

        .backLink {
          color: ${COLORS.blue};
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .backLink:hover {
          text-decoration: underline;
        }

        .header {
          text-align: center;
          margin-bottom: 28px;
        }

        .logoLock {
          display: inline-block;
          margin-bottom: 18px;
        }

        .siteLogo {
          display: block;
          width: clamp(180px, 32vw, 360px);
          height: auto;
          margin: 0 auto;
        }

        .pageTitle {
          font-size: 28px;
          line-height: 1.1;
          font-weight: 800;
          margin: 0 0 14px;
          text-wrap: balance;
        }

        .pageIntro {
          max-width: 720px;
          margin: 0 auto;
          font-size: 16px;
          line-height: 1.6;
        }

        .motionsList {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .motionCard {
          border: 3px solid ${COLORS.blue};
          border-radius: 22px;
          padding: 20px;
          background: ${COLORS.cream};
        }

        .motionHeader {
          margin-bottom: 14px;
        }

        .motionCode {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 8px;
          opacity: 0.75;
        }

        .motionTitle {
          font-size: 22px;
          line-height: 1.2;
          font-weight: 800;
          margin: 0;
          text-wrap: balance;
        }

        .motionSummary {
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 16px;
        }

        .motionMeta {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          padding: 14px;
          border: 2px solid ${COLORS.blue};
          border-radius: 14px;
          margin-bottom: 14px;
        }

        .metaLabel {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 4px;
          opacity: 0.75;
        }

        .metaValue {
          font-size: 14px;
          line-height: 1.5;
        }

        .motionLink {
          display: inline-block;
          color: ${COLORS.blue};
          font-size: 14px;
          font-weight: 700;
          text-decoration: underline;
        }

        .motionLink:hover {
          text-decoration: none;
        }

        @media (min-width: 700px) {
          .container {
            padding: 28px 24px 56px;
          }

          .header {
            margin-bottom: 40px;
          }

          .pageTitle {
            font-size: 38px;
          }

          .pageIntro {
            font-size: 18px;
          }

          .motionCard {
            padding: 26px;
          }

          .motionTitle {
            font-size: 26px;
          }

          .motionSummary {
            font-size: 16px;
          }

          .motionMeta {
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            padding: 16px 18px;
          }
        }

        @media (min-width: 1024px) {
          .pageTitle {
            font-size: 44px;
          }
        }
      `}</style>
    </>
  );
}
