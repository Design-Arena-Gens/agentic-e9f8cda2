import { NextResponse } from "next/server";
import { runAgentTurn } from "@/lib/agent-runtime";
import { getOrCreateSession, persistSession, pushMessage, upsertGoal } from "@/lib/store";
import { AgentGoal, AgentMessage } from "@/lib/types";
import { generateId } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const incomingMessage = String(payload?.message ?? "").trim();

    if (!incomingMessage) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    const session = getOrCreateSession(payload?.sessionId);

    if (Array.isArray(payload?.goals)) {
      payload.goals.forEach((goal: AgentGoal) => {
        upsertGoal(session, goal);
      });
    }

    const userMessage: AgentMessage = {
      id: generateId("msg"),
      role: "user",
      content: incomingMessage,
      createdAt: Date.now()
    };

    pushMessage(session, userMessage);

    const agentResponse = await runAgentTurn({ session, userMessage });

    agentResponse.goals.forEach((goal) => {
      upsertGoal(session, goal);
    });

    pushMessage(session, agentResponse.message);
    persistSession(session);

    return NextResponse.json({
      sessionId: session.id,
      ...agentResponse,
      goals: session.goals
    });
  } catch (error) {
    console.error("[AgentRoute] Failure", error);
    return NextResponse.json(
      {
        error: "Agent failed to respond. Please retry in a few seconds."
      },
      { status: 500 }
    );
  }
}
