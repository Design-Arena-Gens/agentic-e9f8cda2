import { memo } from "react";
import { AgentMessage } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";

interface MessageTimelineProps {
  messages: AgentMessage[];
  busy?: boolean;
}

export const MessageTimeline = memo(function MessageTimeline({ messages, busy }: MessageTimelineProps) {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <article
          key={message.id}
          className={cn(
            "flex flex-col gap-2 rounded-3xl border border-[hsl(var(--border))] bg-white/80 p-5 shadow-sm backdrop-blur transition dark:border-white/10 dark:bg-white/5",
            message.role === "assistant" && "border-[hsl(var(--primary))/60] bg-[hsl(var(--primary))/8]"
          )}
        >
          <header className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
            <span>{message.role === "user" ? "User" : "Pragati"}</span>
            <span>{formatTime(message.createdAt)}</span>
          </header>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[hsl(var(--surface-foreground))] dark:text-white">
            {message.content}
          </p>
        </article>
      ))}
      {busy ? (
        <div className="flex items-center gap-3 rounded-3xl border border-dashed border-[hsl(var(--border))] bg-white/30 p-5 text-xs text-[hsl(var(--muted-foreground))] dark:border-white/10 dark:bg-white/5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span>Pragati is synthesising the next action…</span>
        </div>
      ) : null}
    </div>
  );
});
