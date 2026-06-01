import Link from "next/link";
import { DEPARTMENT_HEADS } from "./data";

const COLORS = {
  blue: "#2f58b8",        // brand blue
  blueDeep: "#1f3d8a",    // body text
  blueFade: "#7a8fc2",    // secondary / muted (faded blue, never gray)
  cream: "#f4f1ec",
  red: "#a3261c",
};

// --- Sparkle SVGs ---
// Inspired by Stay in LA brand: 4-point bursts, chubby 5-point stars, and dots.

function BurstStar({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" />
    </svg>
  );
}

function ChubbyStar({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M50 4 L63 36 L98 40 L72 62 L80 96 L50 78 L20 96 L28 62 L2 40 L37 36 Z" />
    </svg>
  );
}

function Dot({ size = 8, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="40" />
    </svg>
  );
}

function Silhouette() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="silhouetteSvg"
    >
      <circle cx="50" cy="36" r="18" fill="currentColor" opacity="0.85" />
      <path
        d="M14 100 C 14 70, 30 58, 50 58 C 70 58, 86 70, 86 100 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <main className="page">
        <div className="container">
          <header className="hero">
            <div className="heroLogoWrap">
              {/* Sparkles around the logo */}
              <span className="spark spark1" style={{ color: COLORS.blue }}>
                <BurstStar size={28} />
              </span>
              <span className="spark spark2" style={{ color: COLORS.blue }}>
                <ChubbyStar size={18} />
              </span>
              <span className="spark spark3" style={{ color: COLORS.blue }}>
                <Dot size={6} />
              </span>
              <span className="spark spark4" style={{ color: COLORS.blue }}>
                <BurstStar size={20} />
              </span>
              <span className="spark spark5" style={{ color: COLORS.blue }}>
                <Dot size={8} />
              </span>

              <img
                src="/STAYinLA_LogoBlue.png"
                alt="Stay in LA"
                className="siteLogo"
              />
            </div>

            <div className="introWrap">
              <p className="intro">
                On March 4, 2026, Los Angeles City Council unanimously passed
                Councilmember Adrin Nazarian&apos;s 7{" "}
                <Link href="/motions" className="introLink">
                  Keep Hollywood Home motions
                </Link>{" "}
                — a legislative package aimed at stimulating LA&apos;s film
                industry by cutting bureaucratic red tape. As of June 2026,{" "}
                <strong>
                  none of these motions have been enacted by the City&apos;s
                  department heads whose jobs are literally to put these plans
                  into action.
                </strong>
              </p>
            </div>
          </header>

          <section className="cardsSection" aria-label="Department heads">
            <div className="cardsGrid">
              {DEPARTMENT_HEADS.map((head) => {
                const cardInner = (
                  <>
                    <div
                      className={
                        "cardPhoto" +
                        (head.revealed && head.photo ? "" : " cardPhotoEmpty")
                      }
                    >
                      {head.revealed && head.photo ? (
                        <img src={head.photo} alt={head.name || ""} />
                      ) : (
                        <Silhouette />
                      )}
                    </div>
                    <div className="cardBody">
                      <div className="cardDept">{head.department}</div>
                      <div className="cardPos">{head.position}</div>
                      <div className="cardName">
                        {head.revealed && head.name ? (
                          head.name
                        ) : (
                          <span className="cardNamePending">Name pending</span>
                        )}
                      </div>
                    </div>
                  </>
                );

                if (head.revealed) {
                  return (
                    <Link
                      key={head.slug}
                      href={`/${head.slug}`}
                      className="card cardLink"
                    >
                      {cardInner}
                    </Link>
                  );
                }
                return (
                  <div key={head.slug} className="card cardStatic">
                    {cardInner}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Footer sparkles */}
          <div className="footerSparkles" style={{ color: COLORS.blue }}>
            <span className="spark sparkFoot1">
              <ChubbyStar size={14} />
            </span>
            <span className="spark sparkFoot2">
              <BurstStar size={22} />
            </span>
            <span className="spark sparkFoot3">
              <Dot size={5} />
            </span>
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
          max-width: 880px;
          margin: 0 auto;
          padding: 28px 20px 80px;
          box-sizing: border-box;
          position: relative;
        }

        .hero {
          text-align: center;
          margin-bottom: 36px;
          position: relative;
        }

        .heroLogoWrap {
          position: relative;
          display: inline-block;
          padding: 24px 60px;
          margin-bottom: 14px;
        }

        .siteLogo {
          display: block;
          width: clamp(180px, 32vw, 320px);
          height: auto;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .spark { position: absolute; pointer-events: none; }
        .spark1 { top: 0; left: -4px; }
        .spark2 { top: 8px; right: 12px; }
        .spark3 { top: 36px; right: -2px; }
        .spark4 { bottom: 8px; left: 18px; }
        .spark5 { bottom: 20px; right: 32px; }

        .introWrap {
          max-width: 620px;
          margin: 0 auto;
        }

        .intro {
          font-size: 15px;
          line-height: 1.65;
          font-weight: 400;
          margin: 0;
          color: ${COLORS.blueDeep};
        }

        .intro strong {
          font-weight: 600;
          color: ${COLORS.blue};
        }

        .introLink {
          color: ${COLORS.blue};
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }

        .introLink:hover { color: ${COLORS.blueDeep}; }

        .cardsSection { margin-top: 8px; }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .card {
          display: flex;
          flex-direction: column;
          background: ${COLORS.cream};
          border: 1px solid ${COLORS.blue}40;
          border-radius: 6px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .cardLink { cursor: pointer; }
        .cardLink:hover {
          border-color: ${COLORS.blue};
          box-shadow: 0 2px 10px rgba(47, 88, 184, 0.12);
        }
        .cardStatic { cursor: default; }

        .cardPhoto {
          width: 100%;
          aspect-ratio: 5 / 4;
          background: ${COLORS.blue};
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .cardPhoto img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .cardPhotoEmpty { color: ${COLORS.cream}; }

        .silhouetteSvg {
          width: 55%;
          height: 55%;
        }

        .cardBody {
          padding: 12px 14px 14px;
        }

        .cardDept {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${COLORS.blue};
          margin-bottom: 3px;
        }

        .cardPos {
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1.3;
          color: ${COLORS.blueDeep};
          margin-bottom: 6px;
        }

        .cardName {
          font-size: 12.5px;
          color: ${COLORS.blueFade};
          line-height: 1.3;
        }

        .cardNamePending {
          font-style: italic;
        }

        .footerSparkles {
          position: relative;
          height: 60px;
          margin-top: 32px;
        }
        .sparkFoot1 { position: absolute; top: 10px; left: 10%; }
        .sparkFoot2 { position: absolute; top: 4px; left: 48%; }
        .sparkFoot3 { position: absolute; top: 28px; right: 14%; }

        @media (min-width: 700px) {
          .container { padding: 40px 28px 100px; }
          .hero { margin-bottom: 48px; }
          .heroLogoWrap { padding: 30px 80px; margin-bottom: 18px; }
          .spark1 { top: 4px; left: 0; }
          .spark2 { top: 12px; right: 24px; }
          .spark3 { top: 50px; right: 0; }
          .spark4 { bottom: 12px; left: 32px; }
          .spark5 { bottom: 28px; right: 48px; }
          .intro { font-size: 16.5px; line-height: 1.7; }
          .cardsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }
          .cardBody { padding: 14px 16px 16px; }
          .cardDept { font-size: 11px; }
          .cardPos { font-size: 14.5px; }
          .cardName { font-size: 13px; }
        }

        @media (min-width: 1024px) {
          .siteLogo { width: clamp(240px, 28vw, 340px); }
        }
      `}</style>
    </>
  );
}
