"use client";

import { useCallback, useMemo, useState } from "react";
import { SessionHeader } from "./components/SessionHeader";
import { GoalRail } from "./components/GoalRail";
import { MessageTimeline } from "./components/MessageTimeline";
import { ChatComposer } from "./components/ChatComposer";
import { SuggestionsDeck } from "./components/SuggestionsDeck";
import { AgentGoal, AgentMessage, AgentSuggestion } from "@/lib/types";
import { generateId } from "@/lib/utils";

const initialAssistantMessage: AgentMessage = {
  id: generateId("msg"),
  role: "assistant",
  content:
    "नमस्ते! I am Pragati, your autonomous AI साथी. Share the mission you want me to tackle—I will craft goals, execute step-by-step, and return actionable output. How should we begin?",
  createdAt: Date.now()
};

export default function HomePage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [createdAt] = useState(() => Date.now());
  const [messages, setMessages] = useState<AgentMessage[]>([initialAssistantMessage]);
  const [goals, setGoals] = useState<AgentGoal[]>([]);
  const [suggestions, setSuggestions] = useState<AgentSuggestion[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const missionSummary = useMemo(() => {
    if (!goals.length) return "No goals yet. Pragati is waiting for your directive.";
    const active = goals.find((goal) => goal.status === "in-progress");
    return active ? `${active.title}` : goals[0]?.title ?? "";
  }, [goals]);

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: AgentMessage = {
        id: generateId("msg"),
        role: "user",
        content: text,
        createdAt: Date.now()
      };

      setMessages((prev) => [...prev, userMessage]);
      setBusy(true);

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message: text,
            goals
          })
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error ?? "Agent failed");
        }

        const assistantMessage = payload.message as AgentMessage;

        setSessionId(payload.sessionId);
        setMessages((prev) => [...prev, assistantMessage]);
        setGoals(payload.goals as AgentGoal[]);
        setSuggestions(payload.suggestions as AgentSuggestion[]);
        setActiveGoalId((current) => current ?? (payload.goals?.[0]?.id ?? null));
      } catch (error) {
        console.error(error);
        const failureMessage: AgentMessage = {
          id: generateId("msg"),
          role: "assistant",
          content:
            "I encountered an error while contacting the reasoning engine. Please retry in a few seconds or rephrase the directive.",
          createdAt: Date.now()
        };
        setMessages((prev) => [...prev, failureMessage]);
      } finally {
        setBusy(false);
      }
    },
    [sessionId, goals]
  );

  const handleSuggestion = useCallback(
    async (suggestion: AgentSuggestion) => {
      if (busy) return;
      await handleSend(suggestion.prompt);
    },
    [busy, handleSend]
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <SessionHeader createdAt={createdAt} goals={goals} isBusy={busy} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-[hsl(var(--border))] bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
            <h2 className="text-sm uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">Mission Focus</h2>
            <p className="mt-2 text-lg font-semibold text-[hsl(var(--surface-foreground))] dark:text-white">
              {missionSummary}
            </p>
          </div>
          <MessageTimeline messages={messages} busy={busy} />
        </div>
        <aside className="flex flex-col gap-6">
          <GoalRail goals={goals} activeGoalId={activeGoalId} onSelectGoal={(goal) => setActiveGoalId(goal.id)} />
          <SuggestionsDeck suggestions={suggestions} onSelectSuggestion={handleSuggestion} />
        </aside>
      </section>

      <ChatComposer onSubmit={handleSend} disabled={busy} />
    </main>
  );
}
