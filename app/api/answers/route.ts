export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const seed = String(body?.seed ?? "").trim();
    const questionIndex = Number(body?.questionIndex);
    const questionText = String(body?.questionText ?? "").trim();
    const answerText = String(body?.answerText ?? "").trim();

    if (!seed) return NextResponse.json({ error: "Missing seed" }, { status: 400 });
    if (!Number.isFinite(questionIndex)) return NextResponse.json({ error: "Invalid questionIndex" }, { status: 400 });
    if (!questionText) return NextResponse.json({ error: "Missing questionText" }, { status: 400 });
    if (!answerText) return NextResponse.json({ error: "Missing answerText" }, { status: 400 });

    if (answerText.length > 200) {
      return NextResponse.json({ error: "Answer too long" }, { status: 400 });
    }

    const saved = await prisma.answer.create({
      data: {
        seed,
        questionIndex,
        questionText,
        answerText,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, saved }, { status: 201 });
  } catch (e) {
    console.error("POST /api/answers error:", e);
    const message = e instanceof Error ? e.message : "Server error";
    const isDbConfig =
      message.includes("datasource") ||
      message.includes("CONNECTION_STRING") ||
      message.includes("PrismaClientConstructor");
    const isAuth = message.includes("authentication") || message.includes("password") || message.includes("Auth");
    const isConnection = message.includes("connect") || message.includes("ECONNREFUSED") || message.includes("ENOTFOUND");
    const isNoTable = message.includes("does not exist") || message.includes("relation");
    const dev = process.env.NODE_ENV !== "production";
    let userMessage = "Server error";
    if (isDbConfig) userMessage = "Database not configured. Set DATABASE_URL and DIRECT_URL in .env and restart the server.";
    else if (isAuth) userMessage = "Database login failed. Check username and password in .env (and special characters in password must be URL-encoded).";
    else if (isConnection) userMessage = "Cannot connect to database. Is PostgreSQL running? Is the host/port correct in .env?";
    else if (isNoTable) userMessage = "Database tables missing. Run: npx prisma migrate deploy";
    else if (dev) userMessage = message;
    return NextResponse.json(
      { error: userMessage },
      { status: isDbConfig ? 503 : 500 }
    );
  }
}
