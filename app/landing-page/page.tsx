"use client";

import { useEffect, useMemo, useState } from "react";

const QUESTIONS = ["Hi, Ka-Globe! First off, how BLUE has your day been so far?"];

function pickStableQuestionIndex(seed: string, length: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h) % length;
}

const DARK_BLUE = "#1F2E8D";

type LandingSurveyBlockProps = {
  onContinue?: () => void;
};

export default function LandingSurveyBlock({ onContinue }: LandingSurveyBlockProps = {}) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [seed, setSeed] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState("");

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
    if (!question) return;
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(question.slice(0, i + 1));
      i++;
      if (i >= question.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [question]);

  useEffect(() => {
    if (!mounted) return;
    setAnswer("");
    setSubmitted(false);
  }, [question, mounted]);

  const canSubmit = !!seed && answer.trim().length > 0 && answer.trim().length <= 200;

  if (!mounted) return null;

  const textareaHeight = "clamp(160px, 38vh, 320px)";
  const textareaTop = "210px";

  return (
    <>
      {/* Stable Background Layer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/finalBG.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* Main Scrollable Content */}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingTop: "max(240px, 28vh)",
          paddingBottom: "100px",
          boxSizing: "border-box",
          overflowY: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "min(92%, 1100px)",
            background: "#FFFFFF",
            borderRadius: "50px",
            boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.22)",
            padding: "clamp(40px, 6vw, 80px) clamp(30px, 7vw, 100px)",
            position: "relative",
            boxSizing: "border-box",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          {submitted ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              <h2
                style={{
                  color: DARK_BLUE,
                  fontSize: "clamp(32px, 5vw, 64px)",
                  fontWeight: 800,
                  margin: "0 0 20px 0",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Thank you for answering!
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Your feedback helps us make your experience even better.
              </p>
              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
          ) : (
            <>
              <div
                style={{
                  marginBottom: "30px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 3vw, 30px)",
                  lineHeight: "1.3",
                  textAlign: "center",
                  color: "#1F2E8D",
                }}
              >
                {displayText}
                <span
                  style={{
                    borderRight: "2px solid #1F2E8D",
                    marginLeft: "2px",
                    animation: "blink 0.7s infinite",
                  }}
                />
                <style jsx>{`
                  @keyframes blink {
                    0% {
                      opacity: 1;
                    }
                    50% {
                      opacity: 0;
                    }
                    100% {
                      opacity: 1;
                    }
                  }
                `}</style>
              </div>

              <div style={{ width: "100%" }}>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type here..."
                  style={{
                    width: "100%",
                    height: "clamp(120px, 18vh, 160px)",
                    background: "#F2F2F5",
                    borderRadius: "32px",
                    border: "none",
                    padding: "25px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(18px, 2.5vw, 24px)",
                    color: "#1F2E8D",
                    resize: "none",
                    outline: "none",
                    textAlign: "center",
                    boxSizing: "border-box",
                  }}
                />

                {submitError && (
                  <div
                    role="alert"
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      color: "#DC3545",
                      fontSize: "14px",
                      fontFamily: "'Poppins', sans-serif",
                      textAlign: "center",
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "clamp(10px, 2vw, 20px)",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAnswer("")}
                    style={{
                      width: "min(100%, 190px)",
                      height: "56px",
                      background: "#938E8E",
                      borderRadius: "100px",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      transition: "opacity 0.2s, transform 0.1s",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      if (!canSubmit || submitting) return;
                      setSubmitting(true);
                      setSubmitError(null);
                      try {
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
                        const data = await res.json().catch(() => ({}));
                        if (res.ok) {
                          setSubmitted(true);
                        } else {
                          setSubmitError(data?.error ?? "Failed to save. Please try again.");
                        }
                      } catch (e) {
                        console.error(e);
                        setSubmitError("Network error. Please try again.");
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={!canSubmit || submitting}
                    style={{
                      width: "min(100%, 190px)",
                      height: "56px",
                      background: canSubmit ? "#1F2E8D" : "#BDBDBD",
                      borderRadius: "100px",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      transition: "opacity 0.2s, transform 0.1s",
                    }}
                    onMouseDown={(e) =>
                      canSubmit && (e.currentTarget.style.transform = "scale(0.96)")
                    }
                    onMouseUp={(e) =>
                      canSubmit && (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {submitting ? "..." : "Submit"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
