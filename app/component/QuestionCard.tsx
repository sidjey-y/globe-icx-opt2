"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const QUESTIONS = [
  "What’s one word that best describes how you’re feeling right now?",
  "What emoji best describes you today?",
  "How are you doing right now?",
  "If you can give your day a hashtag, what would it be?",
  "How are things going for you today?",
  "What song best describes your day?",
  "What are you most looking forward to doing today?",
  "Where's your desk today - home, office or field?",
  "How's your day so far?",
  "What's your favorite snack to share in a meeting?"
];

const GROUPS = [
  { id: 1, name: "AIG and ISDP Shared Services" },
  { id: 2, name: "Artificial Intelligence" },
  { id: 3, name: "B2B" },
  { id: 4, name: "B2C Territory Management & Synergies" },
  { id: 5, name: "Broadband Business" },
  { id: 6, name: "Consumer Mobile Business" },
  { id: 7, name: "Corporate & Legal Services" },
  { id: 8, name: "Customer Experience Creation" },
  { id: 9, name: "Enterprise Data & Strategic Services" },
  { id: 10, name: "Feel Valued Tribe" },
  { id: 11, name: "Finance & Administration" },
  { id: 12, name: "Human Resources" },
  { id: 13, name: "Information Security & Data Privacy" },
  { id: 14, name: "Information Services" },
  { id: 15, name: "Internal Audit" },
  { id: 16, name: "Marketing" },
  { id: 17, name: "Network Technical" },
  { id: 18, name: "Office of Strategy Management and Customer Experience" },
  { id: 19, name: "Product Experience" },
  { id: 20, name: "Sustainability and Corporate Communications" },
];

function pickStableQuestionIndex(seed: string, length: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h) % length;
}

type MenuPos = { top: number; left: number; width: number };

export default function QuestionCard() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [seed, setSeed] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<number | "">("");
  const [groupOpen, setGroupOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<MenuPos | null>(null);

  const glowStyleInjectedRef = useRef(false);

  const groupWrapRef = useRef<HTMLDivElement | null>(null);
  const groupButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const key = "qs_seed";
    let existing = sessionStorage.getItem(key);
    if (!existing) {
      existing = crypto.randomUUID();
      sessionStorage.setItem(key, existing);
    }
    setSeed(existing);
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

  const selectedGroupName = useMemo(() => {
    if (!groupId) return "";
    return GROUPS.find((g) => g.id === groupId)?.name ?? "";
  }, [groupId]);

  const canSubmit = !!seed && !!groupId && answer.trim().length > 0 && answer.trim().length <= 200;

  // compute dropdown position relative to viewport
  function syncMenuPos() {
    const btn = groupButtonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const top = r.bottom + 8;
    const left = r.left;
    const width = r.width;
    setMenuPos({ top, left, width });
  }

  useEffect(() => {
    if (!groupOpen) return;

    syncMenuPos();

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (!t) return;

      // clicks inside button or menu should not close
      if (groupButtonRef.current && groupButtonRef.current.contains(t)) return;
      if (menuRef.current && menuRef.current.contains(t)) return;

      setGroupOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGroupOpen(false);
    };

    const onReflow = () => {
      syncMenuPos();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [groupOpen]);

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
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} ref={groupWrapRef}>
          <label style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", minWidth: 90 }}>
            Your group
          </label>

          <div style={{ position: "relative", flex: 1 }}>
            <button
              ref={groupButtonRef}
              type="button"
              onClick={() => {
                setGroupOpen((v) => !v);
                // sync position right away (helps if opening for first time)
                setTimeout(syncMenuPos, 0);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                borderRadius: 14,
                padding: "10px 12px",
                fontSize: 14,
                background: "rgba(255,255,255,0.06)",
                color: selectedGroupName ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.60)",
                border: groupOpen ? "1px solid rgba(0, 220, 255, 0.35)" : "1px solid rgba(255,255,255,0.18)",
                outline: "none",
                cursor: "pointer",
                boxShadow: groupOpen ? "0 0 0 3px rgba(0, 220, 255, 0.12)" : "none",
                transition: "box-shadow 160ms ease, border-color 160ms ease, background 160ms ease",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {selectedGroupName || "Select a group…"}
              </span>

              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  borderRight: "2px solid rgba(255,255,255,0.65)",
                  borderBottom: "2px solid rgba(255,255,255,0.65)",
                  transform: groupOpen ? "rotate(-135deg)" : "rotate(45deg)",
                  marginTop: groupOpen ? 2 : -2,
                  transition: "transform 160ms ease, margin-top 160ms ease",
                  flex: "0 0 auto",
                  opacity: 0.9,
                }}
              />
            </button>
          </div>
        </div>

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
              if (!canSubmit || submitted || submitting || questionIndex == null || !seed || !groupId) return;

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
                    groupId,
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

        <div style={{ marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
          Responses are stored in the database and grouped by team.
        </div>
      </div>

      {/* Dropdown menu */}
      {groupOpen && menuPos && typeof document !== "undefined"
        ? createPortal(
            <div
              ref={menuRef}
              role="listbox"
              style={{
                position: "fixed",
                top: menuPos.top,
                left: menuPos.left,
                width: menuPos.width,
                borderRadius: 16,
                background: "rgba(14, 14, 18, 0.92)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06) inset",
                overflow: "hidden",
                zIndex: 9999,
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              <div style={{ maxHeight: 280, overflowY: "auto", padding: 6 }}>
                {GROUPS.map((g) => {
                  const active = groupId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setGroupId(g.id);
                        setGroupOpen(false);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        borderRadius: 12,
                        padding: "10px 10px",
                        fontSize: 14,
                        lineHeight: 1.3,
                        border: "1px solid transparent",
                        background: active ? "rgba(0, 220, 255, 0.14)" : "transparent",
                        color: "rgba(255,255,255,0.92)",
                        cursor: "pointer",
                        transition: "background 140ms ease, border-color 140ms ease",
                        outline: "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {g.name}
                        </span>
                        {active && (
                          <span
                            aria-hidden
                            style={{
                              width: 10,
                              height: 6,
                              borderLeft: "2px solid rgba(120, 255, 180, 0.95)",
                              borderBottom: "2px solid rgba(120, 255, 180, 0.95)",
                              transform: "rotate(-45deg)",
                              marginRight: 2,
                              opacity: 0.95,
                              flex: "0 0 auto",
                            }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
