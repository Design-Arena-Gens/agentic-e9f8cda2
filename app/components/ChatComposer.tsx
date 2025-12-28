import { FormEvent, useRef, useState } from "react";
import { PaperPlaneIcon, ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface ChatComposerProps {
  onSubmit: (value: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatComposer({ onSubmit, disabled }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!value.trim() || disabled || busy) return;

    setBusy(true);
    await onSubmit(value.trim());
    setValue("");
    setBusy(false);
    textareaRef.current?.focus();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[hsl(var(--border))] bg-white/80 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/10"
    >
      <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
        Issue directives to Pragati
      </label>
      <div className="mt-3 flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Describe the mission, share context, or assign a new goal..."
          className={cn(
            "min-h-[92px] flex-1 resize-none rounded-2xl border border-transparent bg-transparent px-4 py-3 text-sm leading-relaxed focus:border-[hsl(var(--primary))] focus:outline-none dark:text-white",
            disabled && "opacity-70"
          )}
        />
        <button
          type="submit"
          disabled={disabled || busy}
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border border-transparent bg-[hsl(var(--primary))] text-white shadow-lg transition hover:bg-[hsl(var(--primary))]/90",
            (disabled || busy) && "pointer-events-none opacity-50"
          )}
          aria-label="Send message to agent"
        >
          {busy ? <ReloadIcon className="size-5 animate-spin" /> : <PaperPlaneIcon className="size-5" />}
        </button>
      </div>
    </form>
  );
}
