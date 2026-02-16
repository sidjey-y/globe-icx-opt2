"use client";

import React, { useState, useCallback } from "react";

const SLIDES = [
  [
    { href: "https://docs.google.com/forms/d/e/1FAIpQLSeX3mtmB6YbaeULX9Fn8fr3fxIEnobz5C1K56D-o4lT5PLBLw/viewform", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/01%20AIG.png", alt: "AIG and ISDP Shared Services" },
    { href: "https://forms.gle/dUgxFZ4NdG8dGcFb9", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/02%20AI.png", alt: "Artificial Intelligence" },
    { href: "#", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/03%20CLSG.png", alt: "Corporate and Legal Services CLSG" },
    { href: "#", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/04%20F%26A.png", alt: "Finance and Administration" },
  ],
  [
    { href: "#", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/05%20HR.png", alt: "HR" },
    { href: "#", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/06%20ISDP.png", alt: "ISDP" },
    { href: "#", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/07%20SCC.png", alt: "SCC" },
    { href: "#", src: "https://raw.githubusercontent.com/sidjey-y/globe-assets/main/business/08%20XXX.png", alt: "" },
  ],
];

export default function EmbedCarouselBusinessPage() {
  const [index, setIndex] = useState(0);

  const move = useCallback((dir: number) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box", padding: "12px 0 24px", background: "#fff" }}>
      <div style={{ position: "relative", width: "100%", overflow: "hidden", padding: "4px 0" }}>
        <div
          style={{
            display: "flex",
            transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {SLIDES.map((slide, si) => (
            <div
              key={si}
              style={{
                minWidth: "100%",
                flexShrink: 0,
                display: "flex",
                flexWrap: "nowrap",
                gap: 12,
                padding: 4,
                boxSizing: "border-box",
              }}
            >
              {slide.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: "0 0 calc(25% - 9px)",
                    minWidth: 0,
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 12,
                      display: "block",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 10px 24px rgba(31, 46, 141, 0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => move(-1)}
          style={{
            position: "absolute",
            left: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(31, 46, 141, 0.92)",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.25)",
            cursor: "pointer",
            fontSize: 20,
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          &#8592;
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => move(1)}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(31, 46, 141, 0.92)",
            color: "#fff",
            border: "2px solid rgba(255,255,255,0.25)",
            cursor: "pointer",
            fontSize: 20,
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          &#8594;
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginTop: 16,
          padding: "14px 0 4px",
          minHeight: 44,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === index ? "#1F2E8D" : "#cfcfcf",
              transform: i === index ? "scale(1.25)" : "scale(1)",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
