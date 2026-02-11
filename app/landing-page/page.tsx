import Image from "next/image";
import Link from "next/link";
import LandingSurveyBlock from "@/app/component/LandingSurveyBlock";

const LIGHT_BLUE = "#C8ECFF";
const DARK_BLUE = "#1F2E8D";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${LIGHT_BLUE} 0%, #b8e2f5 100%)`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav bar — transparent, compact */}
      <header
        style={{
          background: "transparent",
          borderBottom: "1px solid rgba(31, 46, 141, 0.12)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" className="landing-logo-link" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/images/icx-logo.png"
              alt="iCX - Internal Customer Experience"
              width={140}
              height={46}
              style={{ objectFit: "contain" }}
              priority
            />
          </Link>
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Link href="/" className="landing-nav-link landing-nav-link-transparent">
              iCX
            </Link>
            <Link href="#" className="landing-nav-link landing-nav-link-transparent">
              Groups
            </Link>
            <Link href="#" className="landing-nav-link landing-nav-link-transparent">
              FAQs
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content area — full width wrapper for lighthouse */}
      <div
        style={{
          flex: 1,
          position: "relative",
          width: "100%",
          minHeight: 0,
        }}
      >
        {/* Lighthouse background — full width, no margin, bigger */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "55vh",
            minHeight: 320,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/lighthouse.png"
            alt=""
            fill
            style={{
              objectFit: "contain",
              objectPosition: "bottom left",
            }}
          />
        </div>

        {/* Content (above background) */}
        <main
          style={{
            position: "relative",
            zIndex: 1,
            padding: "32px 48px 48px",
            maxWidth: 900,
            margin: "0 auto",
            width: "100%",
          }}
        >
        {/* Question container — 10 questions, user submits answer here */}
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: "28px 32px",
            marginBottom: 80,
            boxShadow:
              "0 4px 24px rgba(31, 46, 141, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)",
            border: "1px solid rgba(31, 46, 141, 0.06)",
          }}
        >
          <LandingSurveyBlock />
        </div>

        {/* Video placeholder */}
        <div
          style={{
            background: "linear-gradient(145deg, #1f1f1f 0%, #151515 100%)",
            borderRadius: 20,
            aspectRatio: "16/9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
            boxShadow:
              "0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="landing-play-btn"
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <svg
              width="30"
              height="34"
              viewBox="0 0 24 28"
              fill="none"
              style={{ marginLeft: 4 }}
            >
              <path d="M2 2L22 14L2 26V2Z" fill={DARK_BLUE} />
            </svg>
          </div>
        </div>

        {/* Bottom section: two buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="#"
            className="landing-outline-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              background: "white",
              color: DARK_BLUE,
              border: `2px solid ${DARK_BLUE}`,
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            Know more about iCX
          </Link>
          <Link
            href="/"
            className="landing-next-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              background: DARK_BLUE,
              color: "white",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(31, 46, 141, 0.35)",
              letterSpacing: "0.02em",
            }}
          >
            Start my iCX journey
          </Link>
        </div>
        </main>
      </div>
    </div>
  );
}
