# Tabs Component Guide

This guide explains the `Tabs` component in `app/components/Tabs.tsx`.

## 1. Decide When The Component Needs Client JavaScript

Next.js App Router components are Server Components by default. The tabs need state, click handlers, keyboard events, and refs, so the file starts with `"use client"`.

```tsx
"use client";
```

Use Client Components for browser interaction. Keep non-interactive display components as Server Components when possible.

Exercise: Remove `"use client"` temporarily and run lint or build. Which hooks or event handlers tell you the component belongs on the client?

## 2. Model The Tab Data

Each tab is represented by a small object:

```tsx
type TabItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  panel?: ReactNode;
};
```

`value` is the stable identifier, `label` is what the user sees, and `panel` is the content shown when the tab is active.

Exercise: Add a third tab with `value: "favorites"` and a short panel message.

## 3. Support Controlled And Uncontrolled Usage

The component accepts `value` and `onValueChange` for controlled usage, but it also works with `defaultValue` and internal state.

```tsx
const [internalValue, setInternalValue] = useState(initialValue);
const activeValue = value ?? internalValue;
```

This makes the component flexible. Simple pages can let `Tabs` own its own state, while larger flows can store the selected tab in a parent component.

Exercise: Create a parent Client Component that stores the active tab in `useState` and passes `value` plus `onValueChange` into `Tabs`.

## 4. Reuse The Existing Button Variants

The tabs are built with the existing `Button` component. Active tabs use `base-primary`; inactive tabs use `base-secondary`.

```tsx
variant={isActive ? "base-primary" : "base-secondary"}
```

This keeps the visual language centralized in one button component instead of duplicating button styles inside the tab component.

Exercise: Change the inactive variant to `outline`. What visual behavior changes, and does it still match the design?

## 5. Match The Container Design

The tablist maps the requested design tokens directly to Tailwind classes:

```tsx
"inline-flex w-full gap-1 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 p-1 shadow-[1px_2px_0_0_var(--color-brand-neutral-900)]"
```

Key mappings:

- `border brand-neutral-900` -> `border border-brand-neutral-900`
- `padding 4px` -> `p-1`
- button gap `4px` -> `gap-1`
- `drop shadow x 1, y 2` -> `shadow-[1px_2px_0_0_var(--color-brand-neutral-900)]`
- pill shape -> `rounded-full`

Exercise: Change `gap-1` to `gap-2`. How does the larger space between buttons affect the selected tab shape and overall balance?

## 6. Add Accessible Tab Semantics

The wrapper uses `role="tablist"`, each button uses `role="tab"`, and panels use `role="tabpanel"`.

```tsx
aria-selected={isActive}
aria-controls={panelId}
role="tab"
tabIndex={isActive ? 0 : -1}
```

`aria-selected` exposes the active state to assistive technology. `tabIndex` keeps keyboard focus on the active tab while arrow keys move between tabs.

Exercise: Use the keyboard to focus the tablist, then press ArrowRight, ArrowLeft, Home, and End. Confirm the selected tab changes.

## 7. Use The Component

```tsx
import { Tabs } from "./components/Tabs";

export default function Example() {
  return (
    <Tabs
      tabs={[
        {
          value: "study",
          label: "Study Mode",
          panel: "Review your active deck one card at a time.",
        },
        {
          value: "all",
          label: "All Cards",
          panel: "Browse every card in the current deck.",
        },
      ]}
    />
  );
}
```

Exercise: Set `defaultValue="all"` and reload the page. The second tab should be selected first.

## 8. Stretch Exercises

1. Add a `size` prop with `"sm"` and `"md"` options for different tab heights.
2. Add a disabled tab and confirm clicks and arrow-key navigation skip it.
3. Add a `renderPanels={false}` example where the parent page renders content based on `onValueChange`.
4. Write a small test plan covering mouse clicks, keyboard navigation, disabled tabs, and controlled state.
