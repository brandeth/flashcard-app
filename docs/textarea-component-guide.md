# TextArea Component Guide

This guide explains the `TextArea` component in `app/components/TextArea.tsx`.

## 1. Match The Existing Input API

The textarea accepts every normal `<textarea>` prop, plus the same two design-system props used by `Input`:

```tsx
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  validationMessage?: ReactNode;
};
```

`TextareaHTMLAttributes<HTMLTextAreaElement>` keeps the component flexible. Callers can pass normal textarea props like `name`, `placeholder`, `defaultValue`, `maxLength`, `disabled`, and `aria-describedby`.

## 2. Generate A Stable ID

The label needs an `id` to connect to. The component uses an explicit `id` first, then `name`, then React's generated ID.

```tsx
const generatedId = useId();
const textAreaId = id ?? name ?? generatedId;
const validationId = validationMessage ? `${textAreaId}-validation` : undefined;
```

That means all of these are valid:

```tsx
<TextArea id="card-answer" label="Answer" />
<TextArea name="answer" label="Answer" />
<TextArea aria-label="Answer" />
```

## 3. Preserve Accessible Descriptions

Validation text is connected with `aria-describedby`. If the caller already passed `aria-describedby`, the component keeps it and adds the validation message ID.

```tsx
const describedBy = [props["aria-describedby"], validationId]
  .filter(Boolean)
  .join(" ");
```

When `validationMessage` exists, the textarea also gets `aria-invalid={true}`.

## 4. Build The Textarea Surface

The base class list mirrors `Input`, but changes the height and vertical padding for multiline text.

```tsx
"h-[100px] min-h-[100px] w-full resize-y rounded-md border border-brand-neutral-900 bg-brand-neutral-0 px-4 py-3 text-preset-5 text-brand-neutral-900 placeholder:text-brand-neutral-600"
```

Key mappings:

- `height: 100px` -> `h-[100px]`
- minimum height of `100px` while resizing -> `min-h-[100px]`
- vertical resizing -> `resize-y`
- horizontal padding -> `px-4`
- vertical padding -> `py-3`
- border, background, text, and placeholder colors match `Input`

## 5. Reuse Hover, Focus, And Validation States

Hover uses the neutral shadow:

```tsx
"hover:shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]"
```

Focus uses the blue border and shadow:

```tsx
"focus:border-brand-blue-600 focus:outline-none focus:shadow-[2px_2px_0_0_var(--color-brand-blue-600)]"
```

Validation overrides the border, hover shadow, and focus shadow with the pink error token:

```tsx
validationMessage
  ? "border-brand-pink-700 shadow-[2px_2px_0_0_var(--color-brand-pink-700)] hover:shadow-[2px_2px_0_0_var(--color-brand-pink-700)] focus:border-brand-pink-700 focus:shadow-[2px_2px_0_0_var(--color-brand-pink-700)]"
  : ""
```

## 6. Use The Component

Default state:

```tsx
<TextArea
  label="Answer"
  name="answer"
  placeholder="e.g., Paris is the capital of France."
/>
```

Validation state:

```tsx
<TextArea
  label="Answer"
  name="answerWithError"
  placeholder="e.g., Paris is the capital of France."
  validationMessage="Please enter an answer."
/>
```

## Coding Exercises

### Exercise 1: Add Character Guidance

Add a `helperText` prop that appears below the textarea only when there is no validation message.

Requirements:

- Use `helperText?: ReactNode`.
- Style it with `text-preset-5-regular text-brand-neutral-600`.
- Connect it with `aria-describedby`.
- Hide it when `validationMessage` exists.

Test case:

```tsx
<TextArea
  label="Answer"
  name="answer"
  helperText="Keep the answer short and easy to review."
/>
```

### Exercise 2: Allow Controlled Resizing

Add a `resize` prop with three options:

```tsx
type TextAreaResize = "none" | "vertical" | "both";
```

Requirements:

- Default to `"vertical"`.
- Map `"none"` to `resize-none`.
- Map `"vertical"` to `resize-y`.
- Map `"both"` to `resize`.
- Keep the default component behavior unchanged.

### Exercise 3: Extract Shared Field Logic

`Input` and `TextArea` both generate IDs and validation IDs. Create a small helper hook or function that both components can use.

Goal:

- Reduce duplication without changing either component's public API.
- Keep the accessibility behavior exactly the same.

Start by comparing these variables in both files:

```tsx
const generatedId = useId();
const fieldId = id ?? name ?? generatedId;
const validationId = validationMessage ? `${fieldId}-validation` : undefined;
const describedBy = [props["aria-describedby"], validationId]
  .filter(Boolean)
  .join(" ");
```
