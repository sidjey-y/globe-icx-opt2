"use client";

import { useEffect, useMemo, useState } from "react";

const QUESTIONS = ["First off, how BLUE has your day been so far?"];

function pickStableQuestionIndex(seed: string, length: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h) % length;
}

const STYLE = {
  font: "'Poppins', sans-serif",
  color: {
    primary: "#1F2E8D",
    primaryLight: "#2F3FA3",
    muted: "#5a5a6e",
    error: "#DC3545",
    inputBg: "#F5F5F8",
    buttonSecondary: "#E8E8EC",
    disabled: "#BDBDBD",
    clearInactive: "#938E8E",
  },
  fontSize: {
    title: "clamp(22px, 3.2vw, 28px)",
    body: "18px",
    small: "14px",
  },
  fontWeight: { title: 800, body: 700, secondary: 600 },
  spacing: { xs: 12, sm: 16, md: 24, lg: 30 },
  radius: { input: "24px", button: "100px" },
  buttonHeight: "56px",
  inputBorder: "1px solid rgba(31, 46, 141, 0.12)",
  inputShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  gradientPrimary:
    "linear-gradient(135deg, rgba(31,46,141,0.95) 0%, rgba(88,64,193,0.92) 55%, rgba(40,43,213,0.9) 100%)",
  shadowPrimary: "0 12px 30px rgba(31, 46, 141, 0.35)",
} as const;

const DARK_BLUE = STYLE.color.primary;

type LandingSurveyBlockProps = {
  onContinue?: () => void;
};

export default function LandingSurveyBlock({ onContinue }: LandingSurveyBlockProps = {}) {
  const [answer, setAnswer] = useState("");
  const [employeeInfo, setEmployeeInfo] = useState("");
  const [surveyStep, setSurveyStep] = useState(0);
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
    setEmployeeInfo("");
    setSurveyStep(0);
  }, [question, mounted]);

  const canSubmitMood = !!seed && answer.trim().length > 0 && answer.trim().length <= 200;
  const canSubmitId = employeeInfo.trim().length > 0;

  if (!mounted) return null;

  const clearActive = answer.trim().length > 0 || employeeInfo.trim().length > 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/finalBG.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "max(280px, 30vh)",
        paddingBottom: "100px",
        boxSizing: "border-box",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "min(92%, 1100px)",
          height: "min(440px, 50vh)",
          minHeight: "380px",
          background: "#FFFFFF",
          borderRadius: "50px",
          boxShadow: "0px 15px 50px rgba(0, 0, 0, 0.22)",
          padding: "clamp(20px, 3vw, 40px) clamp(16px, 3.5vw, 50px)",
          position: "relative",
          boxSizing: "border-box",
          marginBottom: "40px",
          textAlign: "center",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <style jsx global>{`
          .btn-hover {
            transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease, background 0.2s ease;
          }
          .btn-hover:hover:not(:disabled) {
            transform: translateY(-2px) scale(1.02);
          }
          .btn-hover:active:not(:disabled) {
            transform: translateY(0) scale(0.99);
          }
          .survey-step-content {
            animation: stepContentFade 0.35s ease-out;
          }
          @keyframes stepContentFade {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
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
          @keyframes bounce {
            0%,
            20%,
            50%,
            80%,
            100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }
        `}</style>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {surveyStep === 2 ? (
            <div
              className="survey-step-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
                flex: 1,
                minHeight: 0,
              }}
            >
              <span
                style={{
                  fontFamily: STYLE.font,
                  fontWeight: STYLE.fontWeight.title,
                  fontSize: "clamp(32px, 5.5vw, 56px)",
                  lineHeight: "1.2",
                  color: STYLE.color.primary,
                }}
              >
                Answer ICX Now!
              </span>

              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  color: STYLE.color.primary,
                  animation: "bounce 1.5s infinite",
                  fontWeight: 900,
                  marginTop: STYLE.spacing.sm + "px",
                }}
              >
                ↓
              </div>

              <a
                href="https://sites.google.com/globe.com.ph/icx/answer-icx-now"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover"
                style={{
                  marginTop: STYLE.spacing.lg + "px",
                  width: "min(100%, 200px)",
                  height: STYLE.buttonHeight,
                  background: STYLE.gradientPrimary,
                  borderRadius: STYLE.radius.button,
                  fontFamily: STYLE.font,
                  fontWeight: STYLE.fontWeight.body,
                  fontSize: STYLE.fontSize.body,
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: STYLE.shadowPrimary,
                  filter: "saturate(1.08) brightness(1.02)",
                  transition: "opacity 0.2s, transform 0.12s ease, box-shadow 0.18s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px) scale(0.99)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              >
                Done
              </a>
            </div>
          ) : surveyStep === 1 ? (
            <div
              className="survey-step-content"
              style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div
                style={{
                  marginBottom: STYLE.spacing.lg + "px",
                  fontFamily: STYLE.font,
                  fontWeight: STYLE.fontWeight.title,
                  fontSize: STYLE.fontSize.title,
                  lineHeight: "1.3",
                  textAlign: "center",
                  color: STYLE.color.primary,
                }}
              >
                Lock in your ID number and you're all set!
              </div>

              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  value={employeeInfo}
                  onChange={(e) => setEmployeeInfo(e.target.value)}
                  placeholder="Employee ID"
                  style={{
                    width: "100%",
                    height: "clamp(100px, 14vh, 140px)",
                    background: STYLE.color.inputBg,
                    borderRadius: STYLE.radius.input,
                    border: STYLE.inputBorder,
                    padding: STYLE.spacing.md + "px",
                    fontFamily: STYLE.font,
                    fontSize: STYLE.fontSize.body,
                    color: STYLE.color.primary,
                    outline: "none",
                    textAlign: "center",
                    boxSizing: "border-box",
                    boxShadow: STYLE.inputShadow,
                  }}
                />
              </div>

              {submitError && (
                <div
                  role="alert"
                  style={{
                    marginTop: STYLE.spacing.sm + "px",
                    width: "100%",
                    color: STYLE.color.error,
                    fontSize: STYLE.fontSize.small,
                    fontFamily: STYLE.font,
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </div>
              )}

              <div
                style={{
                  marginTop: STYLE.spacing.lg + "px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "clamp(10px, 2vw, 20px)",
                }}
              >
                <button
                  type="button"
                  className="btn-hover"
                  onClick={() => setSurveyStep(0)}
                  style={{
                    width: "min(100%, 190px)",
                    height: STYLE.buttonHeight,
                    background: STYLE.color.buttonSecondary,
                    color: STYLE.color.muted,
                    borderRadius: STYLE.radius.button,
                    fontFamily: STYLE.font,
                    fontWeight: STYLE.fontWeight.secondary,
                    fontSize: STYLE.fontSize.body,
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s, transform 0.12s ease",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px) scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="btn-hover"
                  disabled={!canSubmitId || submitting}
                  onClick={async () => {
                    if (!canSubmitId || submitting) return;
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
                          employeeInfo: employeeInfo.trim(),
                        }),
                      });
                      const data = await res.json().catch(() => ({}));
                      if (res.ok) setSurveyStep(2);
                      else setSubmitError(data?.error ?? "Failed to save. Please try again.");
                    } catch (e) {
                      setSubmitError("Network error. Please try again.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  style={{
                    width: "min(100%, 190px)",
                    height: STYLE.buttonHeight,
                    background: canSubmitId && !submitting ? STYLE.gradientPrimary : STYLE.color.disabled,
                    borderRadius: STYLE.radius.button,
                    fontFamily: STYLE.font,
                    fontWeight: STYLE.fontWeight.body,
                    fontSize: STYLE.fontSize.body,
                    color: "#FFFFFF",
                    border: "none",
                    cursor: canSubmitId && !submitting ? "pointer" : "not-allowed",
                    boxShadow: canSubmitId && !submitting ? STYLE.shadowPrimary : "none",
                    filter: canSubmitId && !submitting ? "saturate(1.08) brightness(1.02)" : "none",
                    transition: "opacity 0.2s, transform 0.12s ease, box-shadow 0.18s ease",
                  }}
                  onMouseDown={(e) =>
                    canSubmitId &&
                    !submitting &&
                    (e.currentTarget.style.transform = "translateY(1px) scale(0.99)")
                  }
                  onMouseUp={(e) => (e.currentTarget.style.transform = "")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  {submitting ? "..." : "Submit"}
                </button>
              </div>
            </div>
          ) : (
            <div
              className="survey-step-content"
              style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}
            >
              <div
                style={{
                  marginBottom: STYLE.spacing.lg + "px",
                  fontFamily: STYLE.font,
                  fontWeight: STYLE.fontWeight.title,
                  fontSize: STYLE.fontSize.title,
                  lineHeight: "1.3",
                  textAlign: "center",
                  color: STYLE.color.primary,
                }}
              >
                {displayText}
                <span
                  style={{
                    borderRight: "2px solid " + STYLE.color.primary,
                    marginLeft: "2px",
                    animation: "blink 0.7s infinite",
                  }}
                />
              </div>

              <div style={{ width: "100%" }}>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type here..."
                  autoFocus
                  style={{
                    width: "100%",
                    height: "clamp(100px, 14vh, 140px)",
                    background: STYLE.color.inputBg,
                    borderRadius: STYLE.radius.input,
                    border: STYLE.inputBorder,
                    padding: STYLE.spacing.md + "px",
                    fontFamily: STYLE.font,
                    fontSize: STYLE.fontSize.body,
                    color: STYLE.color.primary,
                    resize: "none",
                    outline: "none",
                    textAlign: "center",
                    boxSizing: "border-box",
                    boxShadow: STYLE.inputShadow,
                  }}
                />
              </div>

              {submitError && surveyStep === 0 && (
                <div
                  role="alert"
                  style={{
                    marginTop: STYLE.spacing.sm + "px",
                    width: "100%",
                    color: STYLE.color.error,
                    fontSize: STYLE.fontSize.small,
                    fontFamily: STYLE.font,
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </div>
              )}

              <div
                style={{
                  marginTop: STYLE.spacing.lg + "px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "clamp(10px, 2vw, 20px)",
                }}
              >
                <button
                  type="button"
                  className="btn-hover"
                  onClick={() => {
                    setAnswer("");
                    setEmployeeInfo("");
                  }}
                  style={{
                    width: "min(100%, 190px)",
                    height: STYLE.buttonHeight,
                    background: clearActive ? STYLE.color.primary : STYLE.color.clearInactive,
                    borderRadius: STYLE.radius.button,
                    fontFamily: STYLE.font,
                    fontWeight: STYLE.fontWeight.body,
                    fontSize: STYLE.fontSize.body,
                    color: "#FFFFFF",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: clearActive ? STYLE.shadowPrimary : "none",
                    filter: clearActive ? "saturate(1.12) brightness(1.02)" : "none",
                    transition:
                      "transform 0.12s ease, box-shadow 0.18s ease, filter 0.18s ease, background 0.18s ease",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "translateY(1px) scale(0.99)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  Clear
                </button>

                <button
                  type="button"
                  className="btn-hover"
                  onClick={async () => {
                    if (!canSubmitMood || submitting) return;
                    setSubmitting(false);
                    setSubmitError(null);
                    setSurveyStep(1);
                  }}
                  disabled={!canSubmitMood}
                  style={{
                    width: "min(100%, 190px)",
                    height: STYLE.buttonHeight,
                    background: canSubmitMood ? STYLE.gradientPrimary : STYLE.color.disabled,
                    borderRadius: STYLE.radius.button,
                    fontFamily: STYLE.font,
                    fontWeight: STYLE.fontWeight.body,
                    fontSize: STYLE.fontSize.body,
                    color: "#FFFFFF",
                    border: "none",
                    cursor: canSubmitMood ? "pointer" : "not-allowed",
                    boxShadow: canSubmitMood ? STYLE.shadowPrimary : "none",
                    filter: canSubmitMood ? "saturate(1.08) brightness(1.02)" : "none",
                    transition: "opacity 0.2s, transform 0.12s ease, box-shadow 0.18s ease, filter 0.18s ease",
                  }}
                  onMouseDown={(e) => canSubmitMood && (e.currentTarget.style.transform = "translateY(1px) scale(0.99)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}