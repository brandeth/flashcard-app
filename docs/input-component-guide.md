# Input Component Guide

This guide explains the `Input` component in `app/components/Input.tsx`.

## 1. Start With The Component API

The component accepts every normal `<input>` prop, plus two design-system props:

```tsx
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  validationMessage?: ReactNode;
};
```

`label` is optional because some inputs may use an `aria-label` instead. `validationMessage` controls the visual error state and the accessible error text.

## 2. Generate A Stable ID

The component needs an `id` so the label can target the input. It uses the explicit `id`, then `name`, then a generated React ID.

```tsx
const generatedId = useId();
const inputId = id ?? name ?? generatedId;
const validationId = validationMessage ? `${inputId}-validation` : undefined;
```

This means all three examples work:

```tsx
<Input id="deck-name" label="Deck name" />
<Input name="question" label="Question" />
<Input aria-label="Search cards" />
```

## 3. Connect Validation For Accessibility

When there is a validation message, the input gets `aria-invalid` and points to the message with `aria-describedby`.

```tsx
const describedBy = [props["aria-describedby"], validationId]
  .filter(Boolean)
  .join(" ");
```

This preserves any existing description passed by the caller and adds the validation message only when needed.

## 4. Map Design Tokens To Tailwind Classes

The base input styles directly match the requested design:

```tsx
"h-[54px] w-full rounded-md border border-brand-neutral-900 bg-brand-neutral-0 px-4 text-preset-5 text-brand-neutral-900 placeholder:text-brand-neutral-600"
```

Key mappings:

- `height: 54px` -> `h-[54px]`
- `padding: 16px` -> `px-4`
- `border-radius: 6px` -> `rounded-md`
- `background-color: brand-neutral-0` -> `bg-brand-neutral-0`
- `placeholder color: brand-neutral-600` -> `placeholder:text-brand-neutral-600`
- `text color: brand-neutral-900` -> `text-brand-neutral-900`
- `border-color: brand-neutral-900` -> `border-brand-neutral-900`

## 5. Add Hover, Focus, And Error States

Hover uses the neutral token:

```tsx
"hover:shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]"
```

Focus uses the blue token:

```tsx
"focus:border-brand-blue-600 focus:outline-none focus:shadow-[2px_2px_0_0_var(--color-brand-blue-600)]"
```

Validation overrides border, hover shadow, and focus shadow with the pink token:

```tsx
validationMessage
  ? "border-brand-pink-700 shadow-[2px_2px_0_0_var(--color-brand-pink-700)] hover:shadow-[2px_2px_0_0_var(--color-brand-pink-700)] focus:border-brand-pink-700 focus:shadow-[2px_2px_0_0_var(--color-brand-pink-700)]"
  : ""
```

The validation message uses two colors:

- Alert icon: `brand-neutral-900`
- Message text: `brand-pink-700`

```tsx
<p className="flex items-center gap-2 text-preset-5 text-brand-pink-700">
  <span
    aria-hidden="true"
    className="size-[14px] shrink-0 bg-brand-neutral-900 [mask:url('/assets/alert.svg')_center/contain_no-repeat]"
  />
  <span>{validationMessage}</span>
</p>
```

## 6. Use The Component

Default state:

```tsx
<Input
  label="Question"
  name="question"
  placeholder="e.g., What is the capital of France?"
/>
```

Validation state:

```tsx
<Input
  label="Question"
  name="questionWithError"
  placeholder="e.g., What is the capital of France?"
  validationMessage="Please enter a question."
/>
```

## Coding Exercise

Add a `helperText` prop to the component.

Requirements:

- Show `helperText` below the input only when there is no validation message.
- Use `text-preset-5-regular` and `text-brand-neutral-600`.
- Connect it to the input with `aria-describedby`.
- Keep validation messages higher priority than helper text.

Starter shape:

```tsx
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  helperText?: ReactNode;
  label?: ReactNode;
  validationMessage?: ReactNode;
};
```

Test cases:

```tsx
<Input label="Question" helperText="Keep it short and specific." />

<Input
  label="Question"
  helperText="Keep it short and specific."
  validationMessage="Please enter a question."
/>
```

The second example should show only the validation message.
