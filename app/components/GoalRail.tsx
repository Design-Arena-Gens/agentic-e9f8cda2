import { ClipboardList, Flag, Layers, Loader2 } from "lucide-react";
import { AgentGoal } from "@/lib/types";
import { cn } from "@/lib/utils";

interface GoalRailProps {
  goals: AgentGoal[];
  onSelectGoal?: (goal: AgentGoal) => void;
  activeGoalId?: string | null;
}

function goalIcon(status: AgentGoal["status"]) {
  switch (status) {
    case "in-progress":
      return Loader2;
    case "complete":
      return Flag;
    case "blocked":
      return Layers;
    default:
      return ClipboardList;
  }
}

export function GoalRail({ goals, onSelectGoal, activeGoalId }: GoalRailProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
        <span>Mission Goals</span>
        <span>{goals.length}</span>
      </div>
      <div className="flex flex-col gap-3">
        {goals.map((goal) => {
          const Icon = goalIcon(goal.status);
          const isActive = goal.id === activeGoalId;
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onSelectGoal?.(goal)}
              className={cn(
                "group flex w-full cursor-pointer gap-3 rounded-2xl border border-transparent bg-white/60 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[hsl(var(--border))] dark:bg-white/10",
                isActive && "border-[hsl(var(--primary))] bg-[hsl(var(--primary))/12] dark:bg-[hsl(var(--primary))/15]"
              )}
            >
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl border",
                  goal.status === "complete" && "border-emerald-500/50 bg-emerald-500/10 text-emerald-500",
                  goal.status === "in-progress" && "border-blue-500/40 bg-blue-500/10 text-blue-500",
                  goal.status === "blocked" && "border-amber-500/40 bg-amber-500/10 text-amber-500",
                  goal.status === "pending" && "border-[hsl(var(--border))] bg-transparent text-[hsl(var(--muted-foreground))]"
                )}
              >
                <Icon className={cn("size-4", goal.status === "in-progress" && "animate-spin") ?? ""} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-sm font-semibold text-[hsl(var(--surface-foreground))] dark:text-white">
                  {goal.title}
                </span>
                {goal.description ? (
                  <span className="line-clamp-2 text-xs text-[hsl(var(--muted-foreground))]">{goal.description}</span>
                ) : null}
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                  {goal.status.replace("-", " ")}
                </span>
              </div>
            </button>
          );
        })}
        {goals.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[hsl(var(--border))] bg-white/40 p-6 text-center text-xs text-[hsl(var(--muted-foreground))] dark:border-white/15 dark:bg-white/5">
            Goals appear here as Pragati learns about your mission.
          </div>
        ) : null}
      </div>
    </section>
  );
}
