import Link from "next/link";
import { MOTIONS } from "../motions";
import MotionList from "./MotionList";

export const metadata = {
  title: "Keep Hollywood Home Motions — Stay in LA",
  description:
    "The 7 Keep Hollywood Home motions passed unanimously by LA City Council on March 4, 2026.",
};

const COLORS = {
  blue: "#2f58b8",
  blueFade: "rgba(47, 88, 184, 0.6)",
  cream: "#f4f1ec",
};

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
            <div className="heroWrap">
              <img src="/stars.png" alt="" aria-hidden="true" className="heroStarsLeft" />
              <img
                src="/STAYinLA_LogoBlue.png"
                alt="Stay in LA"
                className="siteLogo"
              />
              <img
                src="/stars.png"
                alt=""
                aria-hidden="true"
                className="heroStarsRight"
              />
            </div>

            <h1 className="pageTitle">The Keep Hollywood Home Motions</h1>
            <p className="pageIntro">
              Unanimously passed by Los Angeles City Council on March 4, 2026.
              Each motion below directs specific city departments to take
              specific actions on specific timelines. Most of those deadlines
              have come and gone.
            </p>
            <p className="collapseHint">Tap any motion to expand.</p>
          </header>

          <MotionList motions={MOTIONS} />

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
          -webkit-font-smoothing: antialiased;
        }

        .container {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          box-sizing: border-box;
        }

        .topNav { margin-bottom: 24px; }

        .backLink {
          color: ${COLORS.blue};
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        .backLink:hover { text-decoration: underline; text-underline-offset: 3px; }

        .pageHeader {
          text-align: center;
          margin-bottom: 28px;
        }

        .heroWrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 18px;
        }

        .siteLogo {
          display: block;
          width: clamp(180px, 32vw, 320px);
          height: auto;
          flex-shrink: 0;
        }

        .heroStarsLeft,
        .heroStarsRight {
          width: clamp(70px, 12vw, 120px);
          height: auto;
          display: block;
          flex-shrink: 0;
        }
        .heroStarsRight { transform: scaleX(-1); }

        .pageTitle {
          font-size: 22px;
          line-height: 1.2;
          font-weight: 600;
          margin: 0 0 12px;
          color: ${COLORS.blue};
          letter-spacing: -0.005em;
        }

        .pageIntro {
          max-width: 540px;
          margin: 0 auto 14px;
          font-size: 14.5px;
          line-height: 1.6;
          color: ${COLORS.blue};
        }

        .collapseHint {
          font-size: 12px;
          color: ${COLORS.blueFade};
          margin: 0;
          font-style: italic;
        }

        .footerNav {
          margin-top: 36px;
          text-align: center;
        }

        @media (min-width: 700px) {
          .container { padding: 36px 28px 100px; }
          .pageHeader { margin-bottom: 36px; }
          .heroWrap { gap: 8px; margin-bottom: 22px; }
          .pageTitle { font-size: 26px; }
          .pageIntro { font-size: 15.5px; }
        }
      `}</style>
    </>
  );
}
