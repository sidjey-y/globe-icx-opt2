"use client";

import { useEffect, useMemo, useState } from "react";

const QUESTIONS = [
  "What's one word that best describes how you're feeling right now?",
  "What emoji best describes you today?",
  "How are you doing right now?",
  "If you can give your day a hashtag, what would it be?",
  "How are things going for you today?",
  "What song best describes your day?",
  "What are you most looking forward to doing today?",
  "Where's your desk today - home, office or field?",
  "How's your day so far?",
  "What's your favorite snack to share in a meeting?",
];

function pickStableQuestionIndex(seed: string, length: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h) % length;
}

const DARK_BLUE = "#1F2E8D";

export default function LandingSurveyBlock() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seed, setSeed] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
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

  const canSubmit = !!seed && answer.trim().length > 0 && answer.trim().length <= 200;

  if (!mounted) return null;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      {/* Profile circle placeholder */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "white",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      />
      <div style={{ flex: 1 }}>
        <p
          style={{
            color: DARK_BLUE,
            fontSize: 22,
            fontWeight: 600,
            margin: "0 0 12px 0",
            lineHeight: 1.3,
          }}
        >
          {question}
        </p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your response here…"
          rows={3}
          style={{
            width: "100%",
            resize: "none",
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 15,
            lineHeight: 1.4,
            color: DARK_BLUE,
            background: "white",
            border: "1px solid rgba(31,46,141,0.2)",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: answer.trim().length > 200 ? "#c00" : "rgba(31,46,141,0.6)",
            }}
          >
            {answer.trim().length}/200
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => {
                setAnswer("");
                setSubmitted(false);
              }}
              style={{
                borderRadius: 10,
                padding: "8px 14px",
                fontSize: 14,
                border: `1px solid ${DARK_BLUE}`,
                background: "white",
                color: DARK_BLUE,
                cursor: "pointer",
              }}
            >
              Clear
            </button>
            <button
              type="button"
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
                    console.error("Failed to submit", await res.text());
                    return;
                  }
                  setSubmitted(true);
                } catch (err) {
                  console.error("Error submitting", err);
                } finally {
                  setSubmitting(false);
                }
              }}
              style={{
                borderRadius: 10,
                padding: "8px 18px",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                background: canSubmit && !submitted && !submitting ? DARK_BLUE : "rgba(31,46,141,0.3)",
                color: "white",
                cursor: canSubmit && !submitted && !submitting ? "pointer" : "not-allowed",
              }}
            >
              {submitted ? "Submitted ✓" : submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
