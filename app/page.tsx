import Link from "next/link";
import { DEPARTMENT_HEADS } from "./data";

const COLORS = {
  blue: "#2f58b8",
  cream: "#f4f1ec",
};

// Generic silhouette SVG used for un-revealed cards. Inline so we don't need
// an extra image file. Rendered in the cream color over a blue background.
function Silhouette() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="silhouetteSvg"
    >
      <circle cx="50" cy="36" r="18" fill="currentColor" />
      <path
        d="M14 100 C 14 70, 30 58, 50 58 C 70 58, 86 70, 86 100 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <main className="page">
        <div className="container">
          <section className="hero">
            <div className="titleLock">
              <img
                src="/STAYinLA_LogoBlue.png"
                alt="Stay in LA"
                className="siteLogo"
              />
            </div>

            <div className="introWrap">
              <h1 className="kicker">We See You</h1>
              <p className="intro">
                Earlier this year, City Council passed the Keep Hollywood Home
                motions to protect entertainment workers and keep production in
                Los Angeles. Months later, those motions still have not been
                enacted. The people responsible for putting them into action
                are city department heads — bureaucrats whose jobs are
                literally to do this work. Each week we&apos;re revealing one of
                them. Click their card to send a direct message: do your job.
              </p>
            </div>
          </section>

          <section className="cardsSection">
            <div className="cardsGrid">
              {DEPARTMENT_HEADS.map((head) => {
                if (head.revealed) {
                  return (
                    <Link
                      key={head.slug}
                      href={`/${head.slug}`}
                      className="card cardRevealed"
                    >
                      <div className="cardPhotoWrap">
                        {head.photo ? (
                          <img
                            src={head.photo}
                            alt={head.name || ""}
                            className="cardPhoto"
                          />
                        ) : (
                          <div className="cardPhotoPlaceholder">
                            <Silhouette />
                          </div>
                        )}
                      </div>
                      <div className="cardLabel">
                        <div className="cardName">{head.name}</div>
                        <div className="cardTitle">{head.title}</div>
                      </div>
                    </Link>
                  );
                }
                return (
                  <div key={head.slug} className="card cardMystery">
                    <div className="cardPhotoWrap cardPhotoWrapMystery">
                      <Silhouette />
                    </div>
                    <div className="cardLabel">
                      <div className="cardName">[REDACTED]</div>
                      <div className="cardTitle">DEPT OF ???</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
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
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 16px 40px;
          box-sizing: border-box;
        }

        .hero {
          text-align: center;
          padding-top: 20px;
          padding-bottom: 4px;
          margin-bottom: 28px;
        }

        .titleLock {
          position: relative;
          display: inline-block;
          margin: 0 auto 18px;
          padding: 0 42px;
          max-width: 100%;
        }

        .siteLogo {
          display: block;
          width: clamp(220px, 42vw, 520px);
          height: auto;
          margin: 0 auto;
        }

        .introWrap {
          max-width: 780px;
          margin: 0 auto;
          padding: 0 12px;
        }

        .kicker {
          font-size: 32px;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: 0.02em;
          margin: 0 0 14px;
          text-transform: uppercase;
        }

        .intro {
          font-size: 17px;
          line-height: 1.6;
          font-weight: 400;
          margin: 0;
        }

        .cardsSection {
          margin-top: 8px;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .card {
          display: flex;
          flex-direction: column;
          border: 3px solid ${COLORS.blue};
          border-radius: 20px;
          overflow: hidden;
          background: ${COLORS.cream};
          color: ${COLORS.blue};
          text-decoration: none;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .cardRevealed {
          cursor: pointer;
        }

        .cardRevealed:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(47, 88, 184, 0.18);
        }

        .cardMystery {
          cursor: default;
          opacity: 0.95;
        }

        .cardPhotoWrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: ${COLORS.blue};
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cardPhotoWrapMystery {
          color: ${COLORS.cream};
          padding: 14%;
        }

        .cardPhoto {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cardPhotoPlaceholder {
          color: ${COLORS.cream};
          width: 100%;
          height: 100%;
          padding: 14%;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .silhouetteSvg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .cardLabel {
          padding: 14px 14px 16px;
          text-align: center;
        }

        .cardName {
          font-size: 16px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 4px;
          text-wrap: balance;
        }

        .cardTitle {
          font-size: 13px;
          font-weight: 400;
          line-height: 1.35;
          text-wrap: balance;
        }

        @media (min-width: 700px) {
          .container {
            padding: 24px 24px 44px;
          }

          .hero {
            padding-top: 24px;
            margin-bottom: 36px;
          }

          .titleLock {
            margin-bottom: 22px;
            padding: 0 52px;
          }

          .kicker {
            font-size: 44px;
            margin-bottom: 18px;
          }

          .intro {
            font-size: 19px;
            line-height: 1.65;
          }

          .cardsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
          }

          .cardLabel {
            padding: 18px 16px 20px;
          }

          .cardName {
            font-size: 18px;
          }

          .cardTitle {
            font-size: 14px;
          }
        }

        @media (min-width: 1024px) {
          .container {
            padding: 28px 24px 56px;
          }

          .hero {
            margin-bottom: 44px;
          }

          .kicker {
            font-size: 56px;
          }

          .intro {
            font-size: 20px;
            line-height: 1.7;
          }

          .cardsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 22px;
          }
        }
      `}</style>
    </>
  );
}
