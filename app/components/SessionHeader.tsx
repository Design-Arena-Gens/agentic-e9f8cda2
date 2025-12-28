import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { AgentGoal } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

interface SessionHeaderProps {
  createdAt: number;
  goals: AgentGoal[];
  isBusy: boolean;
}

export function SessionHeader({ createdAt, goals, isBusy }: SessionHeaderProps) {
  const activeGoals = useMemo(() => goals.filter((goal) => goal.status !== "complete"), [goals]);
  const completedGoals = useMemo(() => goals.filter((goal) => goal.status === "complete"), [goals]);

  return (
    <header className="flex flex-col gap-6 rounded-3xl border border-[hsl(var(--border))] bg-white/70 p-7 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            <Sparkles className="size-4 text-[hsl(var(--primary))]" />
            Pragati Agent Session
          </div>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[hsl(var(--surface-foreground))] dark:text-white">
            Agentic Workspace
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[hsl(var(--muted-foreground))] dark:text-[hsl(var(--muted-foreground))]">
            Orchestrate goals, collect evidence, and drive outcomes autonomously. Pragati keeps a live mission log for
            every conversation.
          </p>
        </div>
        <div className="flex h-20 w-44 flex-shrink-0 flex-col justify-between rounded-2xl border border-[hsl(var(--border))] bg-white/60 p-4 text-right shadow-inner dark:border-white/10 dark:bg-white/10">
          <span className="text-xs uppercase tracking-wide text-[hsl(var(--muted-foreground))]">Session started</span>
          <span className="text-lg font-semibold text-[hsl(var(--surface-foreground))] dark:text-white">
            {formatTime(createdAt)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-3">
          <StatusPill label="Active" tone="info" value={activeGoals.length} />
          <StatusPill label="Completed" tone="success" value={completedGoals.length} />
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                isBusy ? "animate-ping bg-blue-500" : "bg-green-500/60"
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-3 w-3 rounded-full",
                isBusy ? "bg-blue-500" : "bg-green-500/70"
              )}
            />
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            {isBusy ? "Thinking" : "Idle"}
          </span>
        </div>
      </div>
    </header>
  );
}

interface StatusPillProps {
  label: string;
  value: number;
  tone: "info" | "success" | "warn";
}

function StatusPill({ label, value, tone }: StatusPillProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]",
        tone === "info" && "bg-blue-500/10 text-blue-500",
        tone === "success" && "bg-emerald-500/10 text-emerald-500",
        tone === "warn" && "bg-amber-500/10 text-amber-500"
      )}
    >
      <span>{value}</span>
      <span>{label}</span>
    </div>
  );
}
