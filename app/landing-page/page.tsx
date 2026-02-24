"use client";


import LandingSurveyBlock from "@/app/component/LandingSurveyBlock";


export default function LandingPage() {
  return (
    <>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background: transparent;
        }


        /* Keep your existing button + card + textarea styling */
        .icxNextButton {
          transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease,
            outline 120ms ease !important;
          will-change: transform;
          transform: translateZ(0);
          position: relative;
          overflow: hidden;
        }
        .icxNextButton::before {
          content: "";
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle at center, #00a0ea, #29348f);
          filter: blur(20px);
          opacity: 0;
          transition: opacity 180ms ease;
          pointer-events: none;
          z-index: 0;
        }
        .icxNextButton:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
        }
        .icxNextButton:hover::before {
          opacity: 0.18;
        }
        .icxNextButton:active {
          transform: translateY(0px) !important;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2) !important;
        }
        .icxNextButton:active::before {
          opacity: 0.12;
        }
        .icxNextButton:focus-visible {
          outline: 3px solid rgba(0, 160, 234, 0.55) !important;
          outline-offset: 3px !important;
        }
        .icxNextButton > span {
          position: relative;
          z-index: 1;
        }


        .icxSecondaryButton {
          transition: transform 180ms ease, box-shadow 180ms ease,
            border-color 180ms ease !important;
          will-change: transform;
          transform: translateZ(0);
          position: relative;
          overflow: hidden;
        }
        .icxSecondaryButton:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1) !important;
          border-color: #00a0ea !important;
        }
        .icxSecondaryButton:active {
          transform: translateY(0px) !important;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1) !important;
        }
        .icxSecondaryButton:focus-visible {
          outline: 3px solid rgba(0, 160, 234, 0.55) !important;
          outline-offset: 3px !important;
        }


        .icxCardShell {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(41, 52, 143, 0.1);
          border-radius: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: box-shadow 180ms ease, transform 180ms ease;
        }
        .icxCardShell:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }
        .icxCardShell:focus-within {
          box-shadow: 0 0 0 4px rgba(0, 160, 234, 0.2),
            0 12px 40px rgba(0, 160, 234, 0.15);
          border-color: rgba(0, 160, 234, 0.3);
        }
        .icxCardShell:active {
          transform: scale(0.998);
          box-shadow: 0 0 0 2px rgba(0, 160, 234, 0.25),
            0 8px 25px rgba(0, 160, 234, 0.2);
        }


        .landing-survey-textarea::placeholder {
          color: rgba(31, 52, 141, 0.55);
        }
        .landing-survey-textarea:focus {
          border-color: rgba(31, 52, 141, 0.38);
          box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.06),
            0 0 0 3px rgba(31, 52, 141, 0.15);
        }
      `}</style>


      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
          padding: "0",
          margin: "0",
        }}
      >
        <div
          className="icxCardShell"
          style={{
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
          }}
        >
          <LandingSurveyBlock />
        </div>
      </div>
    </>
  );
}



