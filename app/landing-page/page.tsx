"use client";

import React from "react";
import LandingSurveyBlock from "@/app/component/LandingSurveyBlock";

import ResponsiveStage from "../component/ResponsiveStage";

const LANDING_BG =
  "linear-gradient(135deg, #121d52 0%, #16235a 25%, #1c2a68 50%, #243574 75%, #2d4280 90%, #354d88 100%)";

export default function LandingPage() {
  return (
    <>
      {/* SVG filter for grain - must be in DOM */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="landing-grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="mono"
            />
            <feBlend in="SourceGraphic" in2="mono" mode="overlay" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          filter: "url(#landing-grain)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: LANDING_BG,
          }}
        />
        {/* Subtle bottom-right lightening */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 80% at 100% 100%, rgba(50, 75, 110, 0.12) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </div>
      <div style={{ position: "fixed", inset: 0, zIndex: 1 }}>
        <ResponsiveStage
          designWidth={1920}
          designHeight={1080}
          fillViewport
          background="transparent"
        >
      <style jsx global>{`
        .icxNextButton {
          transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, outline 120ms ease !important;
          will-change: transform;
          transform: translateZ(0);
          position: relative;
          overflow: hidden;
        }
        .icxNextButton::before {
          content: "";
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle at center, #00A0EA, #29348F);
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
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease !important;
          will-change: transform;
          transform: translateZ(0);
          position: relative;
          overflow: hidden;
        }
        .icxSecondaryButton:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1) !important;
          border-color: #00A0EA !important;
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
          border: 1px solid rgba(41, 52, 143, 0.10);
          border-radius: 32px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: box-shadow 180ms ease, transform 180ms ease;
        }
        .icxCardShell:hover {
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }
        .icxCardShell:focus-within {
          box-shadow: 0 0 0 4px rgba(0, 160, 234, 0.2), 0 12px 40px rgba(0, 160, 234, 0.15);
          border-color: rgba(0, 160, 234, 0.3);
        }
        .icxCardShell:active {
          transform: scale(0.998);
          box-shadow: 0 0 0 2px rgba(0, 160, 234, 0.25), 0 8px 25px rgba(0, 160, 234, 0.2);
        }

        .landing-survey-textarea::placeholder {
          color: rgba(31, 52, 141, 0.55);
        }
        .landing-survey-textarea:focus {
          border-color: rgba(31, 52, 141, 0.38);
          box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(31, 52, 141, 0.15);
        }

      `}</style>
      <div
        style={{
          position: "relative",
          width: "1920px",
          height: "1080px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* Main Content (Text, Chatbox) - centered */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          {/* Hi, Ka-Globe! */}
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "120px",
              lineHeight: "140px",
              textAlign: "center",
              color: "#FFFFFF",
            }}
          >
            Hi, Ka-Globe!
          </div>

          {/* Chatbox / Survey Container */}
          <div
            className="icxCardShell"
            style={{
              width: "1720px",
              height: "700px",
            }}
          >
            <LandingSurveyBlock />
          </div>
        </div>
      </div>
        </ResponsiveStage>
      </div>
    </>
  );
}
