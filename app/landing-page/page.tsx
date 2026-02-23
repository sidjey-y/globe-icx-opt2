"use client";

import React from "react";
import LandingSurveyBlock from "@/app/component/LandingSurveyBlock";

import ResponsiveStage from "../component/ResponsiveStage";

export default function LandingPage() {
  return (
    <ResponsiveStage
      designWidth={1512}
      designHeight={800}
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

        .landing-bg-gradient {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(
            180deg,
            #0f1544 0%,
            #121a52 30%,
            #1a2358 60%,
            #1e2848 85%,
            #232b3d 100%
          );
        }
        .landing-bg-glow {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
            ellipse 80% 60% at 0% 100%,
            rgba(160, 130, 200, 0.12) 0%,
            rgba(160, 130, 200, 0.04) 40%,
            transparent 70%
          );
          pointer-events: none;
        }
        .landing-bg-noise {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.35;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>
      <div
        style={{
          position: "relative",
          width: "1512px",
          height: "800px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* Dark blue gradient + bottom-left glow + grain texture background */}
        <div className="landing-bg-gradient" />
        <div className="landing-bg-glow" />
        <div className="landing-bg-noise" />

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
            gap: "36px",
          }}
        >
          {/* Hi, Ka-Globe! */}
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "96px",
              lineHeight: "120px",
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
              width: "1200px",
              height: "520px",
            }}
          >
            <LandingSurveyBlock />
          </div>
        </div>
      </div>
    </ResponsiveStage>
  );
}
