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
  blueDeep: "#1f3d8a",
  blueFade: "#7a8fc2",
  cream: "#f4f1ec",
};

function BurstStar({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    </svg>
  );
}
function ChubbyStar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M50 4 L63 36 L98 40 L72 62 L80 96 L50 78 L20 96 L28 62 L2 40 L37 36 Z" />
    </svg>
  );
}
function Dot({ size = 6 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <circle cx="50" cy="50" r="40" />
    </svg>
  );
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
            <div className="logoWrap">
              <span className="spark sparkA" style={{ color: COLORS.blue }}>
                <BurstStar size={22} />
              </span>
              <span className="spark sparkB" style={{ color: COLORS.blue }}>
                <Dot size={6} />
              </span>
              <span className="spark sparkC" style={{ color: COLORS.blue }}>
                <ChubbyStar size={14} />
              </span>

              <img
                src="/STAYinLA_LogoBlue.png"
                alt="Stay in LA"
                className="siteLogo"
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
            <span className="footSpark" style={{ color: COLORS.blue }}>
              <BurstStar size={16} />
            </span>
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
          color: ${COLORS.blueDeep};
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
        .backLink:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .pageHeader {
          text-align: center;
          margin-bottom: 28px;
        }

        .logoWrap {
          position: relative;
          display: inline-block;
          padding: 18px 50px;
          margin-bottom: 14px;
        }

        .siteLogo {
          display: block;
          width: clamp(150px, 24vw, 220px);
          height: auto;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .spark { position: absolute; pointer-events: none; }
        .sparkA { top: 4px; left: 0; }
        .sparkB { top: 24px; right: 8px; }
        .sparkC { bottom: 6px; right: 36px; }

        .pageTitle {
          font-size: 22px;
          line-height: 1.2;
          font-weight: 600;
          margin: 0 0 12px;
          color: ${COLORS.blueDeep};
          letter-spacing: -0.005em;
        }

        .pageIntro {
          max-width: 540px;
          margin: 0 auto 14px;
          font-size: 14.5px;
          line-height: 1.6;
          color: ${COLORS.blueDeep};
        }

        .collapseHint {
          display: block;
          font-size: 12px;
          color: ${COLORS.blueFade};
          margin: 0;
          font-style: italic;
        }

        @media (min-width: 700px) {
          .collapseHint { display: none; }
        }

        .footerNav {
          margin-top: 36px;
          text-align: center;
          position: relative;
        }

        .footSpark {
          display: inline-block;
          margin-right: 12px;
          vertical-align: middle;
        }

        @media (min-width: 700px) {
          .container { padding: 36px 28px 100px; }
          .pageHeader { margin-bottom: 36px; }
          .logoWrap { padding: 22px 60px; }
          .pageTitle { font-size: 26px; }
          .pageIntro { font-size: 15.5px; }
        }
      `}</style>
    </>
  );
}
