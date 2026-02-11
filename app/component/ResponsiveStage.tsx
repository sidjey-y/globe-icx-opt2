"use client";

import React, { useState, useEffect, useRef } from "react";

interface ResponsiveStageProps {
    children: React.ReactNode;
    designWidth: number;
    designHeight: number;
}

export default function ResponsiveStage({
    children,
    designWidth,
    designHeight,
}: ResponsiveStageProps) {
    const [scale, setScale] = useState(1);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleResize = () => {
            const viewportWidth = window.innerWidth;
            const newScale = Math.min(1, viewportWidth / designWidth);
            setScale(newScale);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [designWidth]);

    if (!isClient) {
        return (
            <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ width: `${designWidth}px`, height: `${designHeight}px`, margin: "0 auto" }}>
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
