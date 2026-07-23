import { useEffect, useState } from "react";
import Breadcrumbs from "../components/navigation/Breadcrumbs";
import { routes } from "../config/routes";
import { blockedMessageTerms, contactCooldownKey, contactCooldownMs, contactEmail } from "../config/site";

function Contact({ navigate }) {
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("sent") !== "1") return;

    setStatus("success");
    setFeedback("Message sent. Thank you.");
    params.delete("sent");
    const query = params.toString();
    history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
  }, []);

  const validateContent = (subject, message) => {
    const combined = `${subject} ${message}`.trim().toLowerCase();
    const compact = combined.replace(/\s/g, "");
    const uniqueCharacters = new Set(compact).size;
    const linkCount = (combined.match(/https?:\/\/|www\./g) || []).length;

    if (compact.length < 20) {
      return "Please write a little more so the message has enough context.";
    }
    if (/(.)\1{7,}/u.test(compact) || uniqueCharacters / compact.length < 0.12) {
      return "The message looks repetitive. Please add meaningful details.";
    }
    if (linkCount > 2) {
      return "Please include no more than two links.";
    }
    if (blockedMessageTerms.some((term) => combined.includes(term))) {
      return "The message contains blocked language.";
    }
    return "";
  };

  const submit = (event) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const now = Date.now();
    let lastSent = 0;
    try {
      lastSent = Number(localStorage.getItem(contactCooldownKey) || 0);
    } catch {
      // Storage can be unavailable in strict privacy modes.
    }
    const remainingSeconds = Math.ceil((contactCooldownMs - (now - lastSent)) / 1000);

    if (remainingSeconds > 0) {
      event.preventDefault();
      setStatus("error");
      setFeedback(`Please wait ${remainingSeconds} seconds before sending another message.`);
      return;
    }

    const validationError = validateContent(
      String(formData.get("subject") || ""),
      String(formData.get("message") || ""),
    );
    if (validationError) {
      event.preventDefault();
      setStatus("error");
      setFeedback(validationError);
      return;
    }

    setStatus("sending");
    setFeedback("Complete the CAPTCHA to send your message.");
    try {
      localStorage.setItem(contactCooldownKey, String(Date.now()));
    } catch {
      // Submission can continue when storage is unavailable.
    }
  };

  return (
    <main className="sub-main">
      <Breadcrumbs navigate={navigate} items={[{ label: "Home", route: routes.home }, { label: "Contact" }]} />
      <article className="contact-panel">
        <header className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h1>Leave a message</h1>
        </header>

        <form className="contact-form" action={`https://formsubmit.co/${contactEmail}`} method="POST" onSubmit={submit}>
          <input type="hidden" name="_subject" value="New message from diotimachang.com" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_blacklist" value={blockedMessageTerms.join(", ")} />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_next" value={`${location.origin}${location.pathname}?sent=1#/contact`} />
          <div className="contact-honey" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input id="contact-website" type="text" name="_honey" tabIndex="-1" autoComplete="off" />
          </div>

          <div className="contact-field-row">
            <label>
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required maxLength="80" />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required maxLength="160" />
            </label>
          </div>

          <label>
            <span>Subject</span>
            <input type="text" name="subject" required maxLength="120" />
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" rows="8" required maxLength="5000" />
          </label>

          <div className="contact-actions">
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            <p className={`contact-status ${status}`} role="status" aria-live="polite">
              {feedback}
            </p>
          </div>
        </form>
      </article>
    </main>
  );
}

export default Contact;
