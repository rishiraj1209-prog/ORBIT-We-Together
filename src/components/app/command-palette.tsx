"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command, Search, X } from "lucide-react";
import { APP_NAV, APP_ROUTES, QUICK_ACTIONS } from "@/lib/constants/app";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  group: string;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<CommandItem[]>([]);

  const items: CommandItem[] = [
    ...APP_NAV.map((n) => ({
      id: n.href,
      label: n.label,
      href: n.href,
      group: "Navigation",
    })),
    ...QUICK_ACTIONS.map((a) => ({
      id: a.href + a.label,
      label: a.label,
      href: a.href,
      group: "Quick actions",
    })),
    ...people,
  ];

  const filtered = query
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  const groups = [...new Set(filtered.map((i) => i.group))];

  const handleSelect = useCallback(
    (href: string) => {
      onOpenChange(false);
      setQuery("");
      router.push(href);
    },
    [onOpenChange, router]
  );

  useEffect(() => {
    if (open) {
      fetch("/api/search")
        .then((response) => response.json())
        .then((data) => {
          const results = Array.isArray(data.results) ? data.results : [];
          setPeople(results.slice(0, 8).map((person: { uid: string; displayName: string; headline?: string }) => ({
            id: person.uid,
            label: person.displayName,
            description: person.headline,
            href: APP_ROUTES.profile(person.uid),
            group: "People",
          })));
        })
        .catch(() => setPeople([]));
    }

    if (!open) {
      const timer = setTimeout(() => setQuery(""), 0);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative z-[101] w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-text-tertiary" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, people, actions..."
            className="flex-1 bg-transparent py-4 text-sm text-text-primary outline-none placeholder:text-text-tertiary"
            autoFocus
          />
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 text-text-tertiary hover:text-text-primary"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-text-secondary">
              No results found.
            </p>
          ) : (
            groups.map((group) => (
              <div key={group} className="mb-2">
                <p className="px-3 py-1.5 text-xs font-medium text-text-tertiary">
                  {group}
                </p>
                {filtered
                  .filter((i) => i.group === group)
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.href)}
                      className="flex w-full flex-col rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-elevated"
                    >
                      <span className="text-sm font-medium text-text-primary">
                        {item.label}
                      </span>
                      {item.description && (
                        <span className="text-xs text-text-secondary truncate">
                          {item.description}
                        </span>
                      )}
                    </button>
                  ))}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono">
              ↑↓
            </kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono">
              ↵
            </kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <Command className="h-3 w-3" />K to open
          </span>
        </div>
      </div>
    </div>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}
