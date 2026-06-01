import Link from "next/link";
import { DEPARTMENT_HEADS } from "./data";

const COLORS = {
  blue: "#2f58b8",
  blueDeep: "#1f3d8a",
  cream: "#f4f1ec",
  ink: "#1a2238",
  muted: "#6b7280",
};

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
            <img
              src="/STAYinLA_LogoBlue.png"
              alt="Stay in LA"
              className="siteLogo"
            />

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
                        "cardPhoto" + (head.revealed && head.photo ? "" : " cardPhotoEmpty")
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
        </div>
      </main>

      <style>{`
        .page {
          min-height: 100vh;
          background: ${COLORS.cream};
          color: ${COLORS.ink};
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          overflow-x: hidden;
          font-feature-settings: "kern" 1, "liga" 1;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          box-sizing: border-box;
        }

        .hero {
          text-align: center;
          margin-bottom: 44px;
        }

        .siteLogo {
          display: block;
          width: clamp(150px, 24vw, 240px);
          height: auto;
          margin: 0 auto 26px;
        }

        .introWrap {
          max-width: 640px;
          margin: 0 auto;
        }

        .intro {
          font-size: 16px;
          line-height: 1.65;
          font-weight: 400;
          margin: 0;
          color: ${COLORS.ink};
        }

        .intro strong {
          font-weight: 600;
          color: ${COLORS.blueDeep};
        }

        .introLink {
          color: ${COLORS.blue};
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }

        .introLink:hover {
          color: ${COLORS.blueDeep};
        }

        .cardsSection {
          margin-top: 8px;
        }

        .cardsGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid ${COLORS.blue}33;
          border-radius: 6px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .cardLink {
          cursor: pointer;
        }

        .cardLink:hover {
          border-color: ${COLORS.blue};
          box-shadow: 0 2px 8px rgba(47, 88, 184, 0.08);
        }

        .cardStatic {
          cursor: default;
        }

        .cardPhoto {
          width: 100%;
          aspect-ratio: 1 / 1;
          background: ${COLORS.blue};
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cardPhoto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cardPhotoEmpty {
          color: ${COLORS.cream};
        }

        .silhouetteSvg {
          width: 65%;
          height: 65%;
        }

        .cardBody {
          padding: 14px 14px 16px;
        }

        .cardDept {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${COLORS.blue};
          margin-bottom: 4px;
        }

        .cardPos {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.3;
          color: ${COLORS.ink};
          margin-bottom: 8px;
        }

        .cardName {
          font-size: 13px;
          color: ${COLORS.muted};
          line-height: 1.3;
        }

        .cardNamePending {
          font-style: italic;
          color: ${COLORS.muted};
        }

        @media (min-width: 700px) {
          .container {
            padding: 48px 24px 80px;
          }

          .hero {
            margin-bottom: 56px;
          }

          .siteLogo {
            margin-bottom: 32px;
          }

          .intro {
            font-size: 17px;
            line-height: 1.7;
          }

          .cardsGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .cardBody {
            padding: 16px 16px 18px;
          }

          .cardPos {
            font-size: 15px;
          }

          .cardName {
            font-size: 13.5px;
          }
        }

        @media (min-width: 1024px) {
          .cardsGrid {
            gap: 24px;
          }
        }
      `}</style>
    </>
  );
}
