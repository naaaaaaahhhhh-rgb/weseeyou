"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getHeadBySlug } from "../data";
import { getMotionsByIds } from "../motions";

const COLORS = {
  blue: "#2f58b8",
  cream: "#f4f1ec",
};

const SEND_ENDPOINT = "/api/send-advocacy-email";

const DEFAULT_MESSAGE_TEMPLATE = `Dear [Department Head Name],

I'm a Los Angeles resident, and I am writing to ask you why the Keep Hollywood Home motions — which City Council passed earlier this year — have not been enacted by your department.

These motions were passed to protect entertainment workers and keep production in Los Angeles. The work of putting them into action falls to you. Months have gone by, and the people whose livelihoods depend on this industry are still waiting.

We see you. Please do your job.

Sincerely,
[Your name]`;

function fillTemplate(template: string, headName: string, senderName: string) {
  return template
    .replaceAll("[Department Head Name]", headName || "[Department Head Name]")
    .replaceAll("[Your name]", senderName || "[Your name]");
}

function unfillTemplate(filled: string, headName: string, senderName: string) {
  let result = filled;
  if (headName) {
    result = result.replaceAll(`Dear ${headName},`, "Dear [Department Head Name],");
  }
  if (senderName) {
    result = result.replaceAll(senderName, "[Your name]");
  }
  return result;
}

export default function DepartmentHeadPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const head = getHeadBySlug(slug);
  const motions = useMemo(() => {
    if (!head?.motionIds) return [];
    return getMotionsByIds(head.motionIds);
  }, [head]);

  const [senderName, setSenderName] = useState("");
  const [messageTemplate, setMessageTemplate] = useState(
    head?.defaultMessage || DEFAULT_MESSAGE_TEMPLATE
  );
  const [customMessage, setCustomMessage] = useState("");
  const [sendState, setSendState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    setCustomMessage(fillTemplate(messageTemplate, head?.name || "", senderName));
  }, [messageTemplate, head?.name, senderName]);

  // If the slug doesn't match a real, revealed department head, show a not-found state.
  if (!head || !head.revealed) {
    return (
      <main className="page">
        <div className="container">
          <div className="notFound">
            <h1 className="notFoundTitle">Not yet revealed</h1>
            <p className="notFoundBody">
              This department head hasn&apos;t been revealed yet. Check back soon.
            </p>
            <Link href="/" className="backLink">
              ← Back to home
            </Link>
          </div>
        </div>
        <style>{pageStyles}</style>
      </main>
    );
  }

  const emailSubject = head.emailSubject || `Please enact the Keep Hollywood Home motions`;

  function handleMessageChange(value: string) {
    setCustomMessage(value);
    setMessageTemplate(unfillTemplate(value, head?.name || "", senderName));
  }

  async function handleSend() {
    if (!senderName.trim()) {
      setSendState("error");
      setSendError("Enter your name before sending.");
      return;
    }

    setSendState("sending");
    setSendError("");

    try {
      const response = await fetch(SEND_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: head?.email,
          fromName: senderName,
          fromAddress: "Los Angeles, CA",
          subject: emailSubject,
          body: customMessage,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to send.");
      }

      if (data?.mode === "mailto" && data?.mailto) {
        window.location.href = data.mailto;
        setSendState("success");
        return;
      }

      setSendState("success");
    } catch (error) {
      setSendState("error");
      setSendError(error instanceof Error ? error.message : "Unable to send.");
    }
  }

  return (
    <main className="page">
      <div className="container">
        <div className="topNav">
          <Link href="/" className="backLink">
            ← Back to home
          </Link>
        </div>

        <section className="profileSection">
          <div className="profilePhotoWrap">
            {head.photo ? (
              <img src={head.photo} alt={head.name || ""} className="profilePhoto" />
            ) : (
              <div className="profilePhotoPlaceholder">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="50" cy="36" r="18" fill="currentColor" />
                  <path
                    d="M14 100 C 14 70, 30 58, 50 58 C 70 58, 86 70, 86 100 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="profileText">
            <div className="profileKicker">{head.department}</div>
            <h1 className="profileName">{head.name}</h1>
            <div className="profileTitle">{head.title}</div>
            {head.blurb ? <p className="profileBlurb">{head.blurb}</p> : null}
          </div>
        </section>

        {motions.length > 0 ? (
          <section className="motionsSection">
            <h2 className="sectionTitle">Motions they are responsible for enacting</h2>
            <div className="motionsList">
              {motions.map((motion) => (
                <div key={motion.id} className="motionCard">
                  <div className="motionCode">{motion.code}</div>
                  <div className="motionTitle">{motion.title}</div>
                  <div className="motionSummary">{motion.summary}</div>
                  {motion.link ? (
                    <a
                      href={motion.link}
                      target="_blank"
                      rel="noreferrer"
                      className="motionLink"
                    >
                      Learn more
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="emailSection">
          <div className="panel panelBlue">
            <div className="panelKicker">Send your message</div>

            <div className="recipientLine">
              To: <strong>{head.name}</strong>
              {head.email ? <span className="recipientEmail"> · {head.email}</span> : null}
            </div>

            <div>
              <label htmlFor="name" className="label">
                Your name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="input"
              />
            </div>

            <div className="messageBlock">
              <label htmlFor="message" className="label">
                Your message
              </label>
              <div className="messageHelp">
                You can edit this message. The recipient&apos;s name will fill in automatically.
              </div>
              <textarea
                id="message"
                value={customMessage}
                onChange={(e) => handleMessageChange(e.target.value)}
                className="textarea"
              />
            </div>

            <div className="sendButtonWrap">
              <button
                type="button"
                onClick={handleSend}
                disabled={sendState === "sending"}
                className="button buttonCream"
              >
                {sendState === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>

            {sendState === "success" ? (
              <div className="notice">
                <div className="noticeTitle">Message sent</div>
                <div className="noticeBody">
                  Your message was sent or opened in your email app.
                </div>
              </div>
            ) : null}

            {sendState === "error" ? (
              <div className="notice">
                <div className="noticeTitle">Send error</div>
                <div className="noticeBody">{sendError}</div>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <style>{pageStyles}</style>
    </main>
  );
}

const pageStyles = `
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
    margin-bottom: 14px;
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

  .profileSection {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 28px;
    padding: 18px;
    border: 3px solid ${COLORS.blue};
    border-radius: 24px;
  }

  .profilePhotoWrap {
    width: 100%;
    max-width: 240px;
    aspect-ratio: 1 / 1;
    background: ${COLORS.blue};
    color: ${COLORS.cream};
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .profilePhoto {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .profilePhotoPlaceholder {
    width: 100%;
    height: 100%;
    padding: 14%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profilePhotoPlaceholder svg {
    width: 100%;
    height: 100%;
  }

  .profileText {
    text-align: center;
  }

  .profileKicker {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .profileName {
    font-size: 30px;
    line-height: 1.1;
    font-weight: 800;
    margin: 0 0 6px;
    text-wrap: balance;
  }

  .profileTitle {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;
    text-wrap: balance;
  }

  .profileBlurb {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 400;
    margin: 0;
    text-align: left;
  }

  .sectionTitle {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.02em;
    margin: 0 0 14px;
    text-transform: uppercase;
  }

  .motionsSection {
    margin-bottom: 28px;
  }

  .motionsList {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .motionCard {
    border: 3px solid ${COLORS.blue};
    border-radius: 20px;
    padding: 16px;
  }

  .motionCode {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .motionTitle {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.25;
    margin-bottom: 8px;
    text-wrap: balance;
  }

  .motionSummary {
    font-size: 14px;
    line-height: 1.55;
    margin-bottom: 10px;
  }

  .motionLink {
    color: ${COLORS.blue};
    font-weight: 700;
    font-size: 14px;
    text-decoration: underline;
  }

  .emailSection {
    margin-bottom: 16px;
  }

  .panel {
    border: 3px solid ${COLORS.blue};
    border-radius: 24px;
    padding: 20px;
  }

  .panelBlue {
    background: ${COLORS.blue};
    color: ${COLORS.cream};
  }

  .panelKicker {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .recipientLine {
    font-size: 14px;
    margin-bottom: 16px;
    padding: 10px 12px;
    border: 3px solid ${COLORS.cream};
    border-radius: 16px;
    word-break: break-word;
  }

  .recipientEmail {
    opacity: 0.9;
  }

  .label {
    display: block;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .input {
    width: 100%;
    padding: 12px 14px;
    border: 3px solid ${COLORS.cream};
    background: transparent;
    color: ${COLORS.cream};
    border-radius: 16px;
    font-size: 16px;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
  }

  .input::placeholder {
    color: ${COLORS.cream};
    opacity: 0.6;
  }

  .messageBlock {
    margin-top: 16px;
  }

  .messageHelp {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .textarea {
    width: 100%;
    min-height: 260px;
    border-radius: 20px;
    border: 3px solid ${COLORS.cream};
    background: transparent;
    color: ${COLORS.cream};
    padding: 14px;
    outline: none;
    font-size: 15px;
    line-height: 1.55;
    font-family: inherit;
    resize: vertical;
    box-sizing: border-box;
  }

  .sendButtonWrap {
    margin-top: 16px;
  }

  .button {
    border: 3px solid ${COLORS.cream};
    border-radius: 999px;
    padding: 12px 22px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: inherit;
  }

  .button:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .buttonCream {
    background: ${COLORS.cream};
    color: ${COLORS.blue};
  }

  .notice {
    margin-top: 14px;
    padding: 12px 14px;
    border: 3px solid ${COLORS.cream};
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.5;
  }

  .noticeTitle {
    font-weight: 800;
    margin-bottom: 4px;
  }

  .notFound {
    text-align: center;
    padding: 80px 20px;
  }

  .notFoundTitle {
    font-size: 28px;
    font-weight: 800;
    margin: 0 0 10px;
  }

  .notFoundBody {
    font-size: 16px;
    margin: 0 0 20px;
  }

  @media (min-width: 700px) {
    .container {
      padding: 28px 24px 56px;
    }

    .profileSection {
      grid-template-columns: 240px 1fr;
      gap: 24px;
      padding: 22px;
    }

    .profilePhotoWrap {
      max-width: 240px;
    }

    .profileText {
      text-align: left;
    }

    .profileName {
      font-size: 38px;
    }

    .profileTitle {
      font-size: 18px;
    }

    .motionsList {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .panel {
      padding: 26px;
    }
  }

  @media (min-width: 1024px) {
    .profileName {
      font-size: 44px;
    }

    .motionsList {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
  }
`;
