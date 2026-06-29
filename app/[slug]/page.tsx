"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getHeadBySlug } from "../data";
import { getMotionsByIds, Deadline } from "../motions";

const COLORS = {
  blue: "#2f58b8",
  blueFade: "rgba(47, 88, 184, 0.6)",
  cream: "#f4f1ec",
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

// Quick overdue check used for the small "Past due" tags on the motions list.
function motionHasOverdue(deadlines: Deadline[]): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadlines.some((d) => new Date(d.date + "T00:00:00") < today);
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
            <Link href="/" className="backLink">← Back to home</Link>
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
            <Link href="/" className="backLink">← Back</Link>
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
          <Link href="/" className="backLink">← Back</Link>
        </div>

        {/* SECTION 1: Profile */}
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

        {/* SECTION 2: Email — prominent, second on the page */}
        <section className="emailSection">
          <h2 className="emailHeading">Email {head.name}</h2>
          <div className="emailRecipient">
            Sending to <strong>{head.email}</strong>
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

        {/* SECTION 3: Compact motion list (reference) */}
        {motions.length > 0 ? (
          <section className="motionsSection">
            <h2 className="sectionTitle">Responsible for these motions</h2>
            <ul className="motionsList">
              {motions.map((motion) => {
                const overdue = motionHasOverdue(motion.deadlines);
                return (
                  <li key={motion.id} className="motionItem">
                    <span className="motionItemCode">CF {motion.code}</span>
                    <span className="motionItemTitle">{motion.title}</span>
                    {overdue ? <span className="motionItemBadge">Past due</span> : null}
                  </li>
                );
              })}
            </ul>
            <Link href="/motions" className="motionsAllLink">
              See full motion details →
            </Link>
          </section>
        ) : null}
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
    -webkit-font-smoothing: antialiased;
  }

  .container {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
    padding: 24px 20px 80px;
    box-sizing: border-box;
  }

  .topNav { margin-bottom: 20px; }

  .backLink {
    color: ${COLORS.blue};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
  }
  .backLink:hover { text-decoration: underline; text-underline-offset: 3px; }

  /* ---- PROFILE ---- */
  .profile {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 28px;
  }

  .profilePhoto {
    width: 140px;
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
  .profileSilhouette { width: 55%; height: 55%; display: flex; align-items: center; justify-content: center; }
  .profileSilhouette svg { width: 100%; height: 100%; }

  .profileText { text-align: center; }
  .profileKicker {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.blue};
    margin-bottom: 4px;
  }
  .profileName {
    font-size: 22px;
    line-height: 1.15;
    font-weight: 600;
    margin: 0 0 4px;
    color: ${COLORS.blue};
  }
  .profilePos {
    font-size: 14px;
    color: ${COLORS.blueFade};
    margin-bottom: 10px;
  }
  .profileBlurb {
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    text-align: left;
    color: ${COLORS.blue};
  }

  /* ---- EMAIL — the loud, clear CTA ---- */
  .emailSection {
    margin-bottom: 36px;
    background: #fff;
    border: 2px solid ${COLORS.blue};
    border-radius: 8px;
    padding: 22px 20px 24px;
  }

  .emailHeading {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.15;
    margin: 0 0 6px;
    color: ${COLORS.blue};
    letter-spacing: -0.005em;
  }

  .emailRecipient {
    font-size: 13.5px;
    color: ${COLORS.blueFade};
    margin-bottom: 16px;
    word-break: break-word;
  }
  .emailRecipient strong {
    color: ${COLORS.blue};
    font-weight: 600;
  }

  .emailForm { }

  .field { margin-bottom: 14px; }
  .field:last-of-type { margin-bottom: 0; }

  .label {
    display: block;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.blueFade};
    margin-bottom: 6px;
  }
  .help {
    font-size: 12.5px;
    color: ${COLORS.blueFade};
    margin-bottom: 6px;
  }
  .input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid ${COLORS.blue}55;
    background: ${COLORS.cream};
    color: ${COLORS.blue};
    border-radius: 4px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
  }
  .input:focus { border-color: ${COLORS.blue}; }
  .textarea {
    width: 100%;
    min-height: 200px;
    border-radius: 4px;
    border: 1px solid ${COLORS.blue}55;
    background: ${COLORS.cream};
    color: ${COLORS.blue};
    padding: 11px;
    outline: none;
    font-size: 14px;
    line-height: 1.6;
    font-family: inherit;
    resize: vertical;
    box-sizing: border-box;
  }
  .textarea:focus { border-color: ${COLORS.blue}; }

  .actions { margin-top: 14px; }
  .sendButton {
    border: none;
    background: ${COLORS.blue};
    color: #fff;
    border-radius: 4px;
    padding: 11px 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    letter-spacing: 0.02em;
  }
  .sendButton:disabled { opacity: 0.6; cursor: default; }

  .notice {
    margin-top: 12px;
    padding: 9px 12px;
    border-radius: 4px;
    font-size: 13.5px;
    line-height: 1.5;
  }
  .noticeSuccess { background: ${COLORS.blue}14; color: ${COLORS.blue}; }
  .noticeError { background: #fbeae8; color: ${COLORS.red}; }

  /* ---- COMPACT MOTIONS LIST ---- */
  .motionsSection {
    border-top: 1px solid ${COLORS.blue}26;
    padding-top: 20px;
  }

  .sectionTitle {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin: 0 0 12px;
    color: ${COLORS.blueFade};
  }

  .motionsList {
    list-style: none;
    padding: 0;
    margin: 0 0 12px;
  }

  .motionItem {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid ${COLORS.blue}1a;
    font-size: 14px;
    line-height: 1.4;
    flex-wrap: wrap;
  }
  .motionItem:last-child { border-bottom: none; }

  .motionItemCode {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${COLORS.blueFade};
    flex-shrink: 0;
    min-width: 86px;
  }

  .motionItemTitle {
    color: ${COLORS.blue};
    font-weight: 500;
    flex: 1;
  }

  .motionItemBadge {
    display: inline-block;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: ${COLORS.red};
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .motionsAllLink {
    color: ${COLORS.blue};
    font-size: 13px;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* ---- NOT FOUND ---- */
  .notFound { text-align: center; padding: 50px 20px; color: ${COLORS.blue}; }
  .notFoundKicker {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${COLORS.blue};
    margin-bottom: 8px;
  }
  .notFoundTitle { font-size: 22px; font-weight: 600; margin: 0 0 10px; color: ${COLORS.blue}; }
  .notFoundBody { font-size: 14px; color: ${COLORS.blueFade}; margin: 0 0 20px; }

  /* ---- DESKTOP ---- */
  @media (min-width: 700px) {
    .container { padding: 32px 28px 100px; }

    .profile {
      grid-template-columns: 160px 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }
    .profilePhoto { width: 160px; margin: 0; }
    .profileText { text-align: left; }
    .profileName { font-size: 28px; }

    .emailSection { padding: 26px 28px 28px; }
    .emailHeading { font-size: 26px; }
  }
`;
