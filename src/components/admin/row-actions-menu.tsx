"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export interface RowAction {
  label: string;
  onSelect: () => void;
  variant?: "default" | "danger";
}

export function RowActionsMenu({ actions }: { actions: RowAction[] }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Open actions menu"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted outline-none transition-colors hover:bg-background hover:text-foreground data-[state=open]:bg-background data-[state=open]:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <circle cx="5" cy="12" r="1.75" />
            <circle cx="12" cy="12" r="1.75" />
            <circle cx="19" cy="12" r="1.75" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={4}
          className="z-50 min-w-[160px] overflow-hidden rounded-md border border-border bg-card p-1 shadow-lg"
        >
          {actions.map((action) => (
            <DropdownMenu.Item
              key={action.label}
              onSelect={action.onSelect}
              className={`cursor-pointer select-none rounded-sm px-3 py-2 text-sm outline-none data-[highlighted]:bg-accent/10 ${
                action.variant === "danger"
                  ? "text-red-500 data-[highlighted]:text-red-500"
                  : "text-foreground data-[highlighted]:text-accent"
              }`}
            >
              {action.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
