"use client";

import { useEffect, useMemo, useRef, useState } from "react";
const QUESTIONS = [
  "What’s one word that best describes how you’re feeling right now?",
  "How are you doing right now?",
  "If you can give your day a hashtag, what would it be?",
  "How are things going for you today?",
  "What song best describes your day?",
  "What are you most looking forward to doing today?",
  "Where's your desk today - home, office or field?",
  "How's your day so far?",
  "What's your favorite snack to share in a meeting?"
];

function pickStableQuestionIndex(seed: string, length: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h) % length;
}

export default function QuestionCard() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seed, setSeed] = useState<string | null>(null);

  const glowStyleInjectedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    // New seed on every load so the question changes on refresh
    setSeed(crypto.randomUUID());
  }, []);

  const questionIndex = useMemo(() => {
    if (!seed) return null;
    return pickStableQuestionIndex(seed, QUESTIONS.length);
  }, [seed]);

  const question = useMemo(() => {
    if (questionIndex == null) return "";
    return QUESTIONS[questionIndex];
  }, [questionIndex]);

  useEffect(() => {
    if (!mounted) return;
    setAnswer("");
    setSubmitted(false);
  }, [question, mounted]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (glowStyleInjectedRef.current) return;
    glowStyleInjectedRef.current = true;

    const style = document.createElement("style");
    style.setAttribute("data-globe-pulse", "true");
    style.textContent = `
      @keyframes globePulse {
        0% { transform: scale(1); opacity: 0.75; }
        50% { transform: scale(1.05); opacity: 0.95; }
        100% { transform: scale(1); opacity: 0.75; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
      glowStyleInjectedRef.current = false;
    };
  }, []);

  const canSubmit = !!seed && answer.trim().length > 0 && answer.trim().length <= 200;

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "min(720px, 100%)",
        borderRadius: "24px",
        padding: "28px",
        background: "rgba(10, 10, 12, 0.62)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid transparent",
        backgroundImage:
          "linear-gradient(rgba(10,10,12,0.62), rgba(10,10,12,0.62)), linear-gradient(120deg, rgba(123, 92, 255, 0.55), rgba(0, 220, 255, 0.25), rgba(255,255,255,0.08))",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: "0 18px 60px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06) inset",
        overflow: "hidden", // keep for card visuals (safe now because menu is portaled)
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 220px at 20% 0%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(123, 92, 255, 0.20) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(0, 220, 255, 0.12) 0%, transparent 60%)",
          filter: "blur(70px)",
          opacity: 0.85,
          animation: "globePulse 8s ease-in-out infinite",
          pointerEvents: "none",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", position: "relative" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
          Quick Check-in
        </div>

        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>1 question • ~10 seconds</div>
      </div>

      <h1
        style={{
          marginTop: 14,
          marginBottom: 16,
          fontSize: 28,
          lineHeight: 1.25,
          fontWeight: 650,
          color: "rgba(255,255,255,0.92)",
          position: "relative",
        }}
      >
        {question}
      </h1>

      <div style={{ display: "grid", gap: 10, position: "relative" }}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your response here…"
          rows={3}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 220, 255, 0.35)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(0, 220, 255, 0.14), 0 0 0 1px rgba(123, 92, 255, 0.10) inset";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.boxShadow = "none";
          }}
          style={{
            width: "100%",
            resize: "none",
            borderRadius: 16,
            padding: "14px 14px",
            fontSize: 16,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.92)",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            outline: "none",
            transition: "box-shadow 160ms ease, border-color 160ms ease",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Keep it short and honest.</div>
          <div style={{ fontSize: 12, color: answer.trim().length > 200 ? "rgba(255,120,120,0.95)" : "rgba(255,255,255,0.55)" }}>
            {answer.trim().length}/200
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
          <button
            onClick={() => {
              setAnswer("");
              setSubmitted(false);
            }}
            style={{
              borderRadius: 14,
              padding: "10px 14px",
              fontSize: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.82)",
              cursor: "pointer",
            }}
          >
            Clear
          </button>

          <button
            disabled={!canSubmit || submitted || submitting}
            onClick={async () => {
              if (!canSubmit || submitted || submitting || questionIndex == null || !seed) return;

              try {
                setSubmitting(true);
                const res = await fetch("/api/answers", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    seed,
                    questionIndex,
                    questionText: question,
                    answerText: answer.trim(),
                  }),
                });

                if (!res.ok) {
                  console.error("Failed to submit answer", await res.text());
                  return;
                }

                setSubmitted(true);
              } catch (err) {
                console.error("Error submitting answer", err);
              } finally {
                setSubmitting(false);
              }
            }}
            style={{
              borderRadius: 14,
              padding: "10px 16px",
              fontSize: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: submitted
                ? "rgba(120, 255, 180, 0.25)"
                : submitting
                ? "rgba(255,255,255,0.10)"
                : canSubmit
                ? "linear-gradient(120deg, rgba(123, 92, 255, 0.22), rgba(0, 220, 255, 0.14))"
                : "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.92)",
              cursor: canSubmit && !submitted && !submitting ? "pointer" : "not-allowed",
              boxShadow: canSubmit && !submitted && !submitting ? "0 10px 30px rgba(0,0,0,0.35)" : "none",
            }}
          >
            {submitted ? "Submitted ✓" : submitting ? "Submitting…" : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}
