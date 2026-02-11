"use client";

import PixelSnow from "./component/PixelSnow";
import QuestionCard from "./component/QuestionCard";
import Image from "next/image";

export default function Home() {
  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top-left logo */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/ICXLogo.png"
          alt="ICX Logo"
          width={110}
          height={40}
          priority
          style={{
            width: "110px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.55))",
          }}
        />
      </div>

      <PixelSnow
        color="#ffffff"
        flakeSize={0.01}
        minFlakeSize={1.25}
        pixelResolution={450}
        speed={0.25}
        density={0.3}
        depthFade={8}
        farPlane={20}
        brightness={5.0}
        gamma={0.8}
        variant="square"
        direction={125}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: 24,
        }}
      >
        <div style={{ width: "min(720px, 100%)" }}>
          <QuestionCard />
        </div>
      </div>
    </main>
  );
}
