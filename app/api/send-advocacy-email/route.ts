export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const to = String(body?.to || "").trim();
    const fromName = String(body?.fromName || "").trim();
    const fromAddress = String(body?.fromAddress || "").trim();
    const subject = String(body?.subject || "").trim();
    const messageBody = String(body?.body || "").trim();

    if (!to || !fromName || !fromAddress || !subject || !messageBody) {
      return Response.json({ error: "Missing required email fields." }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.ADVOCACY_FROM_EMAIL;

    if (!resendKey || !fromEmail) {
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageBody)}`;
      return Response.json({
        mode: "mailto",
        mailto,
      });
    }

    const emailPayload = {
      from: fromEmail,
      to: [to],
      subject,
      text: messageBody,
      reply_to: fromEmail,
      headers: {
        "X-Advocacy-Resident-Name": fromName,
        "X-Advocacy-Resident-Address": fromAddress,
      },
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const resendData = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      return Response.json(
        { error: resendData?.message || "Unable to send email." },
        { status: 500 }
      );
    }

    return Response.json({
      mode: "sent",
      id: resendData?.id || null,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to send email." },
      { status: 500 }
    );
  }
}
