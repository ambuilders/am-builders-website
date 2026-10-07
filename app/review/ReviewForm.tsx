"use client";

import { useMemo, useState } from "react";

const STANDOUT_PHRASE: Record<string, string> = {
  communication: "how well they communicated the whole way through",
  timeline: "how well they stuck to the schedule",
  quality: "the quality of the finished work",
  "problem-solving": "how they handled the problems that came up along the way",
  pricing: "how fair and transparent the pricing was",
};

const CREW_PHRASE: Record<string, string> = {
  professional: "professional and respectful",
  tidy: "clean and well-organized",
  friendly: "friendly and easy to reach whenever we had questions",
  skilled: "skilled and clearly paid attention to detail",
};

const RECOMMEND_PHRASE: Record<string, string> = {
  "without hesitation": "I'd recommend them without any hesitation",
  definitely: "I'd definitely recommend them",
  would: "I would recommend them",
};

const OPENINGS: ((service: string, city: string) => string)[] = [
  (service, city) => `We hired AM Builders for a ${service} in ${city} and couldn't be happier with how it turned out.`,
  (service, city) => `AM Builders handled a ${service} for us in ${city}, and the whole experience was a great one.`,
  (service, city) => `Had AM Builders take on a ${service} at our place in ${city} — really glad we went with them.`,
];

function buildDraft({
  serviceIdx,
  service,
  locationName,
  standoutKey,
  crewKey,
  recommendKey,
  detail,
}: {
  serviceIdx: number;
  service: string;
  locationName: string;
  standoutKey: string;
  crewKey: string;
  recommendKey: string;
  detail: string;
}) {
  const standout = STANDOUT_PHRASE[standoutKey];
  const crew = CREW_PHRASE[crewKey];
  const recommend = RECOMMEND_PHRASE[recommendKey];
  const opening = OPENINGS[serviceIdx % OPENINGS.length](service, locationName);

  let review = `${opening} What stood out most was ${standout}. The crew was ${crew} on-site the whole time.`;
  if (detail) review += ` One thing worth mentioning — ${detail}.`;
  review += ` ${recommend} to anyone looking for a contractor in the ${locationName} area.`;
  return review;
}

export function ReviewForm() {
  const [service, setService] = useState("basement development");
  const [location, setLocation] = useState("Calgary");
  const [standout, setStandout] = useState("communication");
  const [crew, setCrew] = useState("professional");
  const [recommend, setRecommend] = useState("without hesitation");
  const [detail, setDetail] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState("");

  const serviceOptions: [string, string][] = [
    ["basement development", "Basement development"],
    ["home renovation", "Home renovation"],
    ["new home construction", "New home construction"],
    ["commercial construction", "Commercial construction"],
    ["a repair project", "A smaller repair or fix-up project"],
  ];
  const locationOptions = ["Calgary", "Airdrie", "Chestermere", "Cochrane"];
  const standoutOptions: [string, string][] = [
    ["communication", "How well they communicated throughout"],
    ["timeline", "Staying on schedule"],
    ["quality", "The quality of the finished work"],
    ["problem-solving", "How they handled problems that came up"],
    ["pricing", "Fair, transparent pricing"],
  ];
  const crewOptions: [string, string][] = [
    ["professional", "Professional and respectful"],
    ["tidy", "Clean and well-organized"],
    ["friendly", "Friendly and easy to reach"],
    ["skilled", "Skilled and detail-oriented"],
  ];
  const recommendOptions: [string, string][] = [
    ["without hesitation", "Without any hesitation"],
    ["definitely", "Yes, definitely"],
    ["would", "Yes, I would"],
  ];

  const draft = useMemo(
    () =>
      buildDraft({
        serviceIdx: serviceOptions.findIndex(([v]) => v === service),
        service,
        locationName: location,
        standoutKey: standout,
        crewKey: crew,
        recommendKey: recommend,
        detail,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [service, location, standout, crew, recommend, detail],
  );

  const displayedText = reviewText || draft;

  async function handleGenerate() {
    setGenerating(true);
    setCopiedMsg("");
    try {
      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          location,
          standout: STANDOUT_PHRASE[standout],
          crew: CREW_PHRASE[crew],
          recommend: RECOMMEND_PHRASE[recommend],
          detail,
        }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setReviewText(data.review);
    } catch {
      setCopiedMsg("Could not generate right now — using the quick draft instead.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(displayedText);
      setCopiedMsg("Copied — paste it into your Google review.");
      setTimeout(() => setCopiedMsg(""), 3000);
    } catch {
      setCopiedMsg("Select the text and copy manually.");
    }
  }

  // There's no way for this page (or any website) to post a review to Google
  // directly — only Google's own review page can actually submit one. This
  // copies the text and opens that page in one click so posting it there is
  // the only step left. window.open must run synchronously, before the
  // clipboard `await` — otherwise it's no longer tied to the click that
  // triggered it, and browsers (Safari reliably, Chrome sometimes) block it
  // as an unrequested popup.
  function handleCopyAndOpen() {
    window.open("https://g.page/r/Cai_JPlqgW86EBM/review", "_blank", "noopener,noreferrer");
    navigator.clipboard.writeText(displayedText).then(
      () => setCopiedMsg("Copied! Paste it into the Google page that just opened, then hit Post."),
      () => setCopiedMsg("Couldn't auto-copy — select the text above, copy it, then paste it into Google."),
    );
  }

  return (
    <div className="page">
      <style jsx>{`
        :root {
          --charcoal: #26282b;
          --flamingo: #fc8eac;
          --flamingo-deep: #e2597a;
          --cream: #faf3ec;
          --teal: #2f6e6a;
          --gray: #9c9691;
          --line: #e7dfd5;
        }
        .page {
          background: var(--cream);
          color: var(--charcoal);
          font-family: "Karla", Arial, sans-serif;
          min-height: 100vh;
        }
        .top {
          background: var(--charcoal);
          padding: 22px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          color: var(--cream);
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 19px;
        }
        .logo span {
          color: var(--flamingo);
        }
        .top-tag {
          color: var(--gray);
          font-size: 12.5px;
        }
        .wrap {
          max-width: 920px;
          margin: 0 auto;
          padding: 38px 20px 60px;
        }
        h1 {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: clamp(26px, 4vw, 34px);
          max-width: 620px;
          margin: 0 0 14px 0;
        }
        .board {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 26px;
          margin-top: 30px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .board {
            grid-template-columns: 1fr;
          }
        }
        .panel {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 26px;
        }
        .panel h2 {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 19px;
          margin: 0 0 18px 0;
        }
        .field {
          margin-bottom: 18px;
        }
        label {
          display: block;
          font-weight: 700;
          font-size: 13.5px;
          margin-bottom: 6px;
        }
        select,
        input[type="text"] {
          width: 100%;
          font-size: 14.5px;
          padding: 11px 12px;
          border: 1px solid var(--line);
          border-radius: 7px;
          background: var(--cream);
          color: var(--charcoal);
        }
        select:focus,
        input:focus {
          outline: none;
          border-color: var(--teal);
        }
        .preview-panel {
          background: var(--charcoal);
          color: var(--cream);
          position: sticky;
          top: 20px;
        }
        .preview-panel h2 {
          color: var(--cream);
        }
        .stars {
          color: var(--flamingo);
          font-size: 17px;
          letter-spacing: 2px;
          margin-bottom: 14px;
        }
        textarea {
          width: 100%;
          min-height: 200px;
          background: #fff;
          color: var(--charcoal);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 16px;
          font-size: 15px;
          line-height: 1.6;
          font-family: inherit;
        }
        .final-step {
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid #40424a;
        }
        .final-step p {
          font-size: 12.5px;
          color: var(--gray);
          margin: 0 0 10px 0;
          line-height: 1.5;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 14px;
        }
        .btn {
          font-weight: 700;
          font-size: 14px;
          border-radius: 7px;
          padding: 11px 18px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
        .btn.primary {
          background: var(--flamingo);
          color: var(--charcoal);
        }
        .btn.secondary {
          background: transparent;
          border: 1.5px solid var(--gray);
          color: var(--cream);
        }
        .msg {
          font-size: 12.5px;
          color: var(--flamingo);
          margin-top: 8px;
          min-height: 16px;
        }
        .note {
          font-size: 12px;
          color: var(--gray);
          margin-top: 20px;
          max-width: 560px;
          line-height: 1.6;
        }
      `}</style>

      <div className="top">
        <div className="logo">
          AM <span>BUILDERS</span>
        </div>
        <div className="top-tag">Built on trust. Backed by experience.</div>
      </div>

      <div className="wrap">
        <h1>Tell us how it went — we&apos;ll turn it into a review.</h1>
        <p>
          Answer a few quick questions and we&apos;ll draft a review you can copy into Google. Edit
          anything before posting — it should sound like you.
        </p>

        <div className="board">
          <div className="panel">
            <h2>Your project</h2>

            <div className="field">
              <label>1. Which project did AM Builders help you with?</label>
              <select value={service} onChange={(e) => setService(e.target.value)}>
                {serviceOptions.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>2. Where was the project?</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                {locationOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>3. What stood out most to you?</label>
              <select value={standout} onChange={(e) => setStandout(e.target.value)}>
                {standoutOptions.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>4. How would you describe the crew on-site?</label>
              <select value={crew} onChange={(e) => setCrew(e.target.value)}>
                {crewOptions.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>5. Would you recommend AM Builders to someone else?</label>
              <select value={recommend} onChange={(e) => setRecommend(e.target.value)}>
                {recommendOptions.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>6. Anything specific worth mentioning? (optional)</label>
              <input
                type="text"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="e.g. finished ahead of schedule..."
              />
            </div>
          </div>

          <div className="panel preview-panel">
            <h2>Your review</h2>
            <div className="stars">★★★★★</div>
            <textarea readOnly value={displayedText} />
            <div className="actions">
              <button className="btn primary" onClick={handleGenerate} disabled={generating}>
                {generating ? "Generating…" : "✨ Generate with AI"}
              </button>
              <button className="btn secondary" onClick={handleCopy}>
                Copy review
              </button>
            </div>

            <div className="final-step">
              <p>
                Happy with it? Google doesn&apos;t let any website post a review on your behalf —
                only Google&apos;s own page can do that. This copies your review and opens it for you.
              </p>
              <div className="actions">
                <button className="btn primary" onClick={handleCopyAndOpen}>
                  Copy &amp; Post on Google →
                </button>
              </div>
            </div>

            <div className="msg">{copiedMsg}</div>
          </div>
        </div>

        <div className="note">
          <strong>Note:</strong> please only submit a review if you&apos;ve genuinely worked with AM
          Builders — Google removes reviews (and can penalize the whole profile) when it detects
          reviews from people who haven&apos;t used the business.
        </div>
      </div>
    </div>
  );
}
