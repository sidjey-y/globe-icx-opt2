"use client";


import React from "react";
import LandingSurveyBlock from "@/app/component/LandingSurveyBlock";
import ResponsiveStage from "../component/ResponsiveStage";


const LANDING_BG = [


  "radial-gradient(1200px 900px at 12% 58%, rgba(88, 64, 193, 0.31) 0%, rgba(40, 43, 213, 0.36) 35%, rgba(28, 34, 155, 0) 70%)",


  "radial-gradient(1100px 700px at 45% 22%, rgba(39, 13, 206, 0.22) 0%, rgba(51, 90, 146, 0.08) 40%, rgba(21, 52, 134, 0.00) 75%)",


  "radial-gradient(1400px 900px at 88% 48%, rgba(29, 78, 136, 0.60) 0%, rgba(82, 92, 103, 0.28) 40%, rgba(21, 52, 134, 0.00) 72%)",


  "linear-gradient(120deg, #1f368a 0%, #162f7b 26%, #102c78 48%, #144077 76%, #144077 100%)",


  "linear-gradient(135deg, rgba(22, 15, 236, 0.63) 0%, rgba(27, 13, 217, 0.28) 18%, rgba(32, 30, 151, 0) 42%, rgba(255, 255, 255, 0.00) 100%)",
].join(", ");


export default function LandingPage() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="landing-grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.10"
              numOctaves="3"
              stitchTiles="stitch"
              result="micro"
            />
            <feGaussianBlur in="micro" stdDeviation="0.55" result="microSoft" />


            <feColorMatrix
              in="microSoft"
              type="matrix"
              values="
                0.15 0    0    0   0.02
                0    0.22 0    0   0.04
                0    0    0.55 0   0.12
                0    0    0    1   0
              "
              result="microBlue"
            />
            <feComponentTransfer in="microBlue" result="microA">
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>


            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
              result="grain"
            />
            <feColorMatrix in="grain" type="saturate" values="0" result="grainMono" />
            <feComponentTransfer in="grainMono" result="grainA">
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>


            <feMerge result="texture">
              <feMergeNode in="microA" />
              <feMergeNode in="grainA" />
            </feMerge>


            <feBlend in="SourceGraphic" in2="texture" mode="overlay" result="overlayed" />
            <feBlend in="overlayed" in2="texture" mode="soft-light" />
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
            backgroundColor: "#1d2bccff",
            backgroundImage: LANDING_BG,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />


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
              position: "relative",
              width: "1920px",
              height: "1080px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
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

