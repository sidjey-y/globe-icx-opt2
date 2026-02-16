"use client";

import React, { useState, useEffect } from "react";

interface ResponsiveStageProps {
    children: React.ReactNode;
    designWidth: number;
    designHeight: number;
    /** When true, stage fills viewport (100vw × 100vh) and scales to cover (no letterboxing). */
    fillViewport?: boolean;
    /** Background color when fillViewport (e.g. "#C8ECFF"). Avoids body showing at edges. */
    background?: string;
}

export default function ResponsiveStage({
    children,
    designWidth,
    designHeight,
    fillViewport = false,
    background,
}: ResponsiveStageProps) {
    const [scale, setScale] = useState(1);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            if (fillViewport) {
                const scaleW = viewportWidth / designWidth;
                const scaleH = viewportHeight / designHeight;
                setScale(Math.max(scaleW, scaleH));
            } else {
                setScale(Math.min(1, viewportWidth / designWidth));
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [designWidth, designHeight, fillViewport]);

    if (!isClient) {
        return (
            <div
                style={{
                    width: fillViewport ? "100vw" : "100%",
                    height: fillViewport ? "100vh" : "auto",
                    overflow: "hidden",
                    background: background ?? "inherit",
                }}
            >
                <div style={{ width: `${designWidth}px`, height: `${designHeight}px`, margin: "0 auto" }}>
                    {children}
                </div>
            </div>
        );
    }

    if (fillViewport) {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                    position: "relative",
                    background: background ?? "inherit",
                }}
            >
                <div
                    style={{
                        width: `${designWidth}px`,
                        height: `${designHeight}px`,
                        transform: `translate(-50%, -50%) scale(${scale})`,
                        transformOrigin: "center center",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        willChange: "transform",
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                width: "100%",
                height: `${designHeight * scale}px`,
                overflow: "hidden",
                position: "relative",
                background: "inherit",
            }}
        >
            <div
                style={{
                    width: `${designWidth}px`,
                    height: `${designHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top center",
                    position: "absolute",
                    left: "50%",
                    marginLeft: `-${designWidth / 2}px`,
                    willChange: "transform",
                }}
            >
                {children}
            </div>
        </div>
    );
}
