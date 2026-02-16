"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LandingSurveyBlock from "@/app/component/LandingSurveyBlock";

import ResponsiveStage from "../component/ResponsiveStage";

export default function LandingPage() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <ResponsiveStage designWidth={1512} designHeight={800}>
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
          border-radius: 24px;
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

        .lighthouse-beam-pulse {
          animation: lighthouse-beam-pulse 2.5s ease-in-out infinite;
        }
        @keyframes lighthouse-beam-pulse {
          0%, 100% {
            opacity: 0.78;
            filter: brightness(0.94) drop-shadow(0 0 12px rgba(0, 160, 234, 0.3));
          }
          50% {
            opacity: 1;
            filter: brightness(1.06) drop-shadow(0 0 28px rgba(0, 160, 234, 0.55));
          }
        }

        .lighthouse-beam-focused {
          animation: none !important;
          opacity: 1 !important;
          filter: drop-shadow(0 0 20px rgba(0, 160, 234, 0.5)) !important;
        }

        .lighthouse-idle {
          animation: lighthouse-idle 3s ease-in-out infinite;
        }
        @keyframes lighthouse-idle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        /* Subtle "lantern" glow on the lighthouse tower */
        .lighthouse-glow {
          animation: lighthouse-glow 4s ease-in-out infinite;
        }
        @keyframes lighthouse-glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 -4px 20px rgba(255, 220, 180, 0.12)); }
          50% { filter: brightness(1.08) drop-shadow(0 -6px 28px rgba(255, 235, 200, 0.2)); }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          width: "1512px",
          height: "800px",
          background: "#C8ECFF",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* Layer 1: Blue Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#C8ECFF",
            zIndex: 0,
          }}
        />

        {/* Layer 2: Hero Elements (Lighthouse & Beam) */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>

          {/* Vector 1 (Beam) */}
          <div
            className={`lighthouse-beam-pulse ${isFocused ? "lighthouse-beam-focused" : ""}`}
            style={{
              position: "absolute",
              width: "1595px",
              height: "1074px",
              left: "152px",
              top: "-103px",
              zIndex: 1,
              transition: "filter 0.3s ease, transform 0.3s ease",
            }}
          >
            <Image
              src="/images/Vector 1.png"
              alt="Lighthouse Beam"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Lighthouse */}
          <div
            className="lighthouse-idle lighthouse-glow"
            style={{
              position: "absolute",
              width: "887px",
              height: "624px",
              left: "-101px",
              top: "348px",
              zIndex: 2,
            }}
          >
            <Image
              src="/images/lighthouse.png"
              alt="Lighthouse"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Layer 3: Main Content (Text, Nav, Chatbox) */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", zIndex: 10 }}>

          {/* Hi, Ka-Globe! */}
          <div
            style={{
              position: "absolute",
              width: "563px",
              height: "60px",
              left: "618px",
              top: "152px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "64px",
              lineHeight: "96px",
              textAlign: "center",
              color: "#1F2E8D",
            }}
          >
            Hi, Ka-Globe!
          </div>



          {/* Chatbox / Survey Container */}
          <div
            className="icxCardShell"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              position: "absolute",
              width: "920px",
              height: "380px",
              left: "440px",
              top: "295px",
            }}
          >
            <LandingSurveyBlock />
          </div>

        </div>
      </div>
    </ResponsiveStage>
  );
}
