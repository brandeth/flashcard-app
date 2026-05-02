import { InputHTMLAttributes, ReactNode } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
};

export function Checkbox({
  label,
  className = "",
  id,
  ...props
}: CheckboxProps) {
  const inputId = id ?? props.name;

  return (
    <label
      htmlFor={inputId}
      className={[
        "inline-flex cursor-pointer items-center gap-2 text-preset-5 text-brand-neutral-900",
        props.disabled ? "cursor-not-allowed opacity-50" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input id={inputId} type="checkbox" className="peer sr-only" {...props} />

      <span
        aria-hidden="true"
        className="
          flex size-5 shrink-0 items-center justify-center rounded-sm
            border border-brand-neutral-900
            bg-brand-neutral-0
            transition-[background-color,box-shadow] duration-150 ease-in-out
            peer-hover:shadow-[1px_1px_0_0_var(--color-brand-neutral-900)]
            peer-focus-visible:outline-2
            peer-focus-visible:outline-offset-2
            peer-focus-visible:outline-brand-blue-600
            peer-checked:bg-brand-yellow-500
            peer-checked:bg-[url('/assets/check.svg')]
            peer-checked:bg-size-[12px_10px]
            peer-checked:bg-center
            peer-checked:bg-no-repeat
        "
      />

      {label ? <span>{label}</span> : null}
    </label>
  );
}
