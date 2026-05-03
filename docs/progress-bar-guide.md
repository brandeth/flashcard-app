# Progress Bar Component Guide

This guide walks through the progress bar added in `app/components/ProgressBar.tsx`.

## 1. Start With The Props

The component needs a current `value`, an optional `max`, and an accessible label.

```tsx
type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
};
```

Exercise: Add a `size` prop with `"sm"` and `"md"` options. Keep `"sm"` at `60px` wide and make `"md"` `120px` wide.

## 2. Clamp The Value

Clamping keeps the fill width valid even if the caller passes a value below `0` or above `max`.

```tsx
const safeMax = max > 0 ? max : 100;
const clampedValue = Math.min(Math.max(value, 0), safeMax);
const percent = (clampedValue / safeMax) * 100;
```

Exercise: Try rendering values of `-20`, `0`, `50`, `100`, and `180`. Confirm the fill never goes below `0%` or above `100%`.

## 3. Build The Track

The outer element is the fixed track from the design: `60px` wide, `8px` tall, fully rounded, and neutral-colored.

```tsx
<div
  className="h-2 w-[60px] overflow-hidden rounded-full border border-brand-neutral-900 bg-brand-neutral-0"
  role="progressbar"
>
  ...
</div>
```

Exercise: Remove `overflow-hidden` temporarily. What changes when the fill reaches high percentages?

## 4. Add The Fill

The inner element uses the percentage as an inline width because Tailwind classes are static, while progress is dynamic.

```tsx
<div
  className="h-full rounded-full bg-brand-neutral-900 transition-[width] duration-150 ease-in-out"
  style={{ width: `${percent}%` }}
/>
```

Exercise: Change the transition duration from `150` to `300`. Which feels better for quick flashcard progress updates?

## 5. Make It Accessible

The visual bar needs machine-readable progress values for assistive technology.

```tsx
<div
  aria-label="Deck mastery"
  aria-valuemax={100}
  aria-valuemin={0}
  aria-valuenow={40}
  role="progressbar"
/>
```

Exercise: Render two progress bars on the same page. Give each one a different `label`, such as `"Deck mastery"` and `"Daily goal"`.

## 6. Use The Component

```tsx
import { ProgressBar } from "./components/ProgressBar";

export default function Example() {
  return <ProgressBar label="Deck mastery" value={40} />;
}
```

Exercise: Map over an array of values and render the five states from the reference image.

```tsx
{[0, 20, 40, 60, 80].map((value) => (
  <ProgressBar key={value} label={`Deck mastery ${value}%`} value={value} />
))}
```
