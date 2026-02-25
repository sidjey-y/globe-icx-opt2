"use client";


import { useEffect, useMemo, useState } from "react";


const QUESTIONS = [
  "What's one word that best describes how you're feeling right now?",
  "What color best describes you today?",
  "How are you doing right now?",
  "If you can give your day a hashtag, what would it be?",
  "How are things going for you today?",
  "What song best describes your day?",
  "What are you most looking forward to doing today?",
  "Where's your desk today - home, office or field?",
  "How's your day so far?",
  "What's your favorite snack to share in a meeting?",
  "As an employee, what makes you proud to be Ka-Globe?",
  "As a customer, what makes you love Globe?",
  "How was your caffeine boost today?",
  "How did your meetings go today?",
  "How did your trip to work go today?",
  "How was it like getting your food today? Any service wins or fails?",
  "Any recent app experience that felt smooth or glitchy? How did it go?",
  "What vibe did your conversation with a teammate give you today?",
];


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


  // Responsive textarea height that "feels right" across screen sizes
  // (still works perfectly with your proportional scaling parent)
  const textareaHeight = "clamp(160px, 38vh, 320px)";
  const textareaTop = "210px"; // stays safely below the question area


  if (submitted) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(5px)",
          borderRadius: "30px",
          boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.3)",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            color: DARK_BLUE,
            fontSize: 44,
            fontWeight: 700,
            margin: "0 0 24px 0",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Your answer has been submitted.
          <br />
          Thanks for sharing!
        </p>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "24px",
            color: DARK_BLUE,
          }}
        >
          Answer iCX now!
        </span>
      </div>
    );
  }


  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Outer Card Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.3)",
          borderRadius: "30px",
        }}
      />


      <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
        {/* QUICK CHECK IN */}
        <div
          style={{
            position: "absolute",
            left: "45px",
            top: "46px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            fontSize: "22px",
            letterSpacing: "0.05em",
            color: "#1F2E8D",
            opacity: 0.8,
            whiteSpace: "nowrap",
          }}
        >
          QUICK CHECK IN
        </div>
        <div
          style={{
            position: "absolute",
            top: "92px",
            left: "45px",
            right: "45px",
            height: "96px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "48px",
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


        {/* ✅ Textarea + Buttons grouped */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: textareaTop,
            width: "calc(100% - 90px)",
            maxWidth: "calc(1580px - 90px)",
            boxSizing: "border-box",
          }}
        >
          <textarea
            className="landing-survey-textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type here..."
            style={{
              width: "100%",
              height: textareaHeight,


              background: "rgba(255, 255, 255, 0.95)",
              boxShadow:
                "inset 0px 2px 6px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(31, 52, 141, 0.12)",
              borderRadius: "24px",
              border: "2px solid rgba(31, 52, 141, 0.18)",
              padding: "32px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "26px",
              color: "#1F2E8D",
              resize: "none",
              outline: "none",
              textAlign: "center",
              boxSizing: "border-box",
              display: "block",
            }}
          />


          {submitError && (
            <div
              role="alert"
              style={{
                marginTop: "12px",
                width: "100%",
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(220, 53, 69, 0.12)",
                border: "1px solid rgba(220, 53, 69, 0.4)",
                color: "#1F2E8D",
                fontSize: "14px",
                fontFamily: "'Poppins', sans-serif",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              {submitError}
            </div>
          )}


          <div
            style={{
              marginTop: submitError ? "12px" : "14px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => setAnswer("")}
              style={{
                width: "200px",
                height: "62px",
                background: "#938E8E",
                borderRadius: "50px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "#FFFFFF",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
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
                width: "200px",
                height: "62px",
                background: canSubmit ? "#1F2E8D" : "#938E8E",
                borderRadius: "50px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "#FFFFFF",
                border: "none",
                cursor: canSubmit ? "pointer" : "not-allowed",
                opacity: canSubmit ? 1 : 0.7,
                transition: "background 0.2s",
              }}
            >
              {submitting ? "..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

