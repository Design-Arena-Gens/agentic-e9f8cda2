import { Wand2 } from "lucide-react";
import { AgentSuggestion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SuggestionsDeckProps {
  suggestions: AgentSuggestion[];
  onSelectSuggestion: (suggestion: AgentSuggestion) => void;
}

export function SuggestionsDeck({ suggestions, onSelectSuggestion }: SuggestionsDeckProps) {
  if (!suggestions.length) {
    return (
      <div className="rounded-3xl border border-dashed border-[hsl(var(--border))] bg-white/40 p-5 text-sm text-[hsl(var(--muted-foreground))] dark:border-white/10 dark:bg-white/5">
        Pragati will surface contextual actions here as the mission evolves.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => onSelectSuggestion(suggestion)}
          className={cn(
            "group flex items-start gap-4 rounded-3xl border border-transparent bg-white/70 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-[hsl(var(--primary))] dark:bg-white/10"
          )}
        >
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[hsl(var(--primary))/12] text-[hsl(var(--primary))]">
            <Wand2 className="size-5" />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-semibold text-[hsl(var(--surface-foreground))] dark:text-white">
              {suggestion.label}
            </span>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{suggestion.prompt}</p>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
              {suggestion.category}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
