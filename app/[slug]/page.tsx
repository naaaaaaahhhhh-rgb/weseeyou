"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getHeadBySlug } from "../data";
import { getMotionsByIds } from "../motions";

const COLORS = {
  blue: "#2f58b8",
  blueDeep: "#1f3d8a",
  cream: "#f4f1ec",
  ink: "#1a2238",
  muted: "#6b7280",
  red: "#a3261c",
};

const SEND_ENDPOINT = "/api/send-advocacy-email";

const DEFAULT_MESSAGE_TEMPLATE = `Dear [Department Head Name],

I'm a Los Angeles resident, and I am writing to ask why the Keep Hollywood Home motions — which City Council passed unanimously on March 4, 2026 — have not been enacted by your department.

These motions were passed to protect entertainment workers and keep production in Los Angeles. The work of putting them into action falls to you. Months have gone by, and the people whose livelihoods depend on this industry are still waiting.

Please do your job.

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

  if (!head) {
    return (
      <main className="page">
        <div className="container">
          <div className="notFound">
            <h1 className="notFoundTitle">Page not found</h1>
            <p className="notFoundBody">This page doesn&apos;t exist.</p>
            <Link href="/" className="backLink">
              ← Back to home
            </Link>
          </div>
        </div>
        <style>{pageStyles}</style>
      </main>
    );
  }

  if (!head.revealed) {
    return (
      <main className="page">
        <div className="container">
          <div className="topNav">
            <Link href="/" className="backLink">
              ← Back
            </Link>
          </div>
          <div className="notFound">
            <div className="notFoundKicker">{head.department}</div>
            <h1 className="notFoundTitle">{head.position}</h1>
            <p className="notFoundBody">
              This profile has not yet been published. Check back soon.
            </p>
          </div>
        </div>
        <style>{pageStyles}</style>
      </main>
    );
  }

  const emailSubject = head.emailSubject || "Please enact the Keep Hollywood Home motions";

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
      if (!response.ok) throw new Error(data?.error || "Unable to send.");
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
            ← Back
          </Link>
        </div>

        <section className="profile">
          <div className="profilePhoto">
            {head.photo ? (
              <img src={head.photo} alt={head.name || ""} />
            ) : (
              <div className="profileSilhouette">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="50" cy="36" r="18" fill="currentColor" opacity="0.85" />
                  <path
                    d="M14 100 C 14 70, 30 58, 50 58 C 70 58, 86 70, 86 100 Z"
                    fill="currentColor"
                    opacity="0.85"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="profileText">
            <div className="profileKicker">{head.department}</div>
            <h1 className="profileName">{head.name}</h1>
            <div className="profilePos">{head.position}</div>
            {head.blurb ? <p className="profileBlurb">{head.blurb}</p> : null}
          </div>
        </section>

        {motions.length > 0 ? (
          <section className="motionsSection">
            <h2 className="sectionTitle">Motions they are responsible for</h2>
            <div className="motionsList">
              {motions.map((motion) => (
                <article key={motion.id} className="motionRef">
                  <div className="motionRefCode">CF {motion.code}</div>
                  <div className="motionRefTitle">{motion.title}</div>
                  <p className="motionRefSummary">{motion.summary}</p>
                  <Link href="/motions" className="motionRefLink">
                    See full motion details →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section className="emailSection">
          <div className="emailHeader">
            <h2 className="sectionTitle">Send a message</h2>
            <div className="emailRecipient">
              To: <strong>{head.name}</strong>
              {head.email ? <span className="emailAddr"> · {head.email}</span> : null}
            </div>
          </div>

          <div className="emailForm">
            <div className="field">
              <label htmlFor="name" className="label">Your name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="input"
              />
            </div>

            <div className="field">
              <label htmlFor="message" className="label">Your message</label>
              <div className="help">
                You can edit this. The recipient&apos;s name fills in automatically.
              </div>
              <textarea
                id="message"
                value={customMessage}
                onChange={(e) => handleMessageChange(e.target.value)}
                className="textarea"
              />
            </div>

            <div className="actions">
              <button
                type="button"
                onClick={handleSend}
                disabled={sendState === "sending"}
                className="sendButton"
              >
                {sendState === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>

            {sendState === "success" ? (
              <div className="notice noticeSuccess">
                Your message was sent or opened in your email app.
              </div>
            ) : null}
            {sendState === "error" ? (
              <div className="notice noticeError">{sendError}</div>
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

  .topNav { margin-bottom: 28px; }

  .backLink {
    color: ${COLORS.blue};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
  }
  .backLink:hover { text-decoration: underline; text-underline-offset: 3px; }

  .profile {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 44px;
  }

  .profilePhoto {
    width: 180px;
    aspect-ratio: 1 / 1;
    background: ${COLORS.blue};
    color: ${COLORS.cream};
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .profilePhoto img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .profileSilhouette {
    width: 65%; height: 65%;
    display: flex; align-items: center; justify-content: center;
  }
  .profileSilhouette svg { width: 100%; height: 100%; }

  .profileText { text-align: center; }
  .profileKicker {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.blue};
    margin-bottom: 6px;
  }
  .profileName {
    font-size: 28px;
    line-height: 1.15;
    font-weight: 600;
    margin: 0 0 4px;
    letter-spacing: -0.01em;
  }
  .profilePos {
    font-size: 15px;
    color: ${COLORS.muted};
    margin-bottom: 14px;
  }
  .profileBlurb {
    font-size: 15px;
    line-height: 1.65;
    margin: 0;
    text-align: left;
  }

  .sectionTitle {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 0 0 14px;
    color: ${COLORS.muted};
  }

  .motionsSection { margin-bottom: 44px; }

  .motionsList {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .motionRef {
    background: #fff;
    border: 1px solid ${COLORS.blue}26;
    border-radius: 6px;
    padding: 18px;
  }
  .motionRefCode {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 8px;
  }
  .motionRefTitle {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 8px;
  }
  .motionRefSummary {
    font-size: 14px;
    line-height: 1.55;
    margin: 0 0 10px;
  }
  .motionRefLink {
    color: ${COLORS.blue};
    font-size: 13px;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .motionRefLink:hover { color: ${COLORS.blueDeep}; }

  .emailSection { margin-bottom: 16px; }
  .emailHeader { margin-bottom: 18px; }
  .emailRecipient {
    font-size: 14px;
    color: ${COLORS.ink};
    padding: 10px 12px;
    background: #fff;
    border: 1px solid ${COLORS.blue}26;
    border-radius: 4px;
    word-break: break-word;
  }
  .emailAddr { color: ${COLORS.muted}; }

  .emailForm {
    background: #fff;
    border: 1px solid ${COLORS.blue}26;
    border-radius: 6px;
    padding: 22px;
  }

  .field { margin-bottom: 18px; }
  .field:last-of-type { margin-bottom: 0; }

  .label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.muted};
    margin-bottom: 8px;
  }
  .help {
    font-size: 13px;
    color: ${COLORS.muted};
    margin-bottom: 8px;
  }
  .input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${COLORS.blue}40;
    background: ${COLORS.cream};
    color: ${COLORS.ink};
    border-radius: 4px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
  }
  .input:focus { border-color: ${COLORS.blue}; }
  .textarea {
    width: 100%;
    min-height: 240px;
    border-radius: 4px;
    border: 1px solid ${COLORS.blue}40;
    background: ${COLORS.cream};
    color: ${COLORS.ink};
    padding: 12px;
    outline: none;
    font-size: 14.5px;
    line-height: 1.6;
    font-family: inherit;
    resize: vertical;
    box-sizing: border-box;
  }
  .textarea:focus { border-color: ${COLORS.blue}; }

  .actions { margin-top: 18px; }
  .sendButton {
    border: none;
    background: ${COLORS.blue};
    color: #fff;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
  }
  .sendButton:hover { background: ${COLORS.blueDeep}; }
  .sendButton:disabled { opacity: 0.6; cursor: default; }

  .notice {
    margin-top: 14px;
    padding: 10px 12px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
  }
  .noticeSuccess { background: ${COLORS.blue}14; color: ${COLORS.blueDeep}; }
  .noticeError { background: #fbeae8; color: ${COLORS.red}; }

  .notFound { text-align: center; padding: 60px 20px; }
  .notFoundKicker {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.blue};
    margin-bottom: 8px;
  }
  .notFoundTitle { font-size: 26px; font-weight: 600; margin: 0 0 12px; }
  .notFoundBody { font-size: 15px; color: ${COLORS.muted}; margin: 0 0 24px; }

  @media (min-width: 700px) {
    .container { padding: 36px 28px 80px; }
    .profile {
      grid-template-columns: 180px 1fr;
      gap: 32px;
      margin-bottom: 56px;
    }
    .profileText { text-align: left; }
    .profileName { font-size: 34px; }
    .motionsList {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
