"use client";

import SignIn from "./SignIn";
import Image from "next/image";

export default function SignInView() {
  return (
    <>
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
          <SignIn />
        </div>
      </div>
    </>
  );
}
