"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const searchParams = useSearchParams();
  const domainError = searchParams.get("error") === "DomainNotAllowed";

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
        overflow: "hidden",
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
      <div style={{ position: "relative" }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          Quick Check-in
        </div>
        <h1
          style={{
            marginTop: 14,
            marginBottom: 24,
            fontSize: 28,
            lineHeight: 1.25,
            fontWeight: 650,
            color: "rgba(255,255,255,0.92)",
          }}
        >
          Sign in with your Globe Google account (@globe.com.ph)
        </h1>
        {domainError && (
          <div
            role="alert"
            style={{
              marginBottom: 20,
              padding: "12px 14px",
              borderRadius: 12,
              background: "rgba(255, 120, 120, 0.15)",
              border: "1px solid rgba(255, 120, 120, 0.35)",
              color: "rgba(255, 200, 200, 0.95)",
              fontSize: 14,
            }}
          >
            Only Globe (@globe.com.ph) accounts can sign in. Please use your work email.
          </div>
        )}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            borderRadius: 14,
            padding: "14px 20px",
            fontSize: 16,
            fontWeight: 600,
            background: "rgba(255,255,255,0.95)",
            color: "rgba(20,20,22,0.92)",
            border: "1px solid rgba(255,255,255,0.2)",
            outline: "none",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            transition: "background 160ms ease, box-shadow 160ms ease",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
