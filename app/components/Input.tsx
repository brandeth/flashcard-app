import { useId, type InputHTMLAttributes, type ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  validationMessage?: ReactNode;
};

export function Input({
  className = "",
  id,
  label,
  name,
  validationMessage,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? name ?? generatedId;
  const validationId = validationMessage ? `${inputId}-validation` : undefined;
  const describedBy = [props["aria-describedby"], validationId]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "h-[54px] w-full rounded-md border border-brand-neutral-900 bg-brand-neutral-0 px-4 text-preset-5 text-brand-neutral-900 placeholder:text-brand-neutral-600",
    "transition-[border-color,box-shadow] duration-150 ease-in-out",
    "hover:shadow-[2px_2px_0_0_var(--color-brand-neutral-900)]",
    "focus:border-brand-blue-600 focus:outline-none focus:shadow-[2px_2px_0_0_var(--color-brand-blue-600)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    validationMessage
      ? "border-brand-pink-700 shadow-[2px_2px_0_0_var(--color-brand-pink-700)] hover:shadow-[2px_2px_0_0_var(--color-brand-pink-700)] focus:border-brand-pink-700 focus:shadow-[2px_2px_0_0_var(--color-brand-pink-700)]"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <label htmlFor={inputId} className="text-preset-4 text-brand-neutral-900">
          {label}
        </label>
      ) : null}

      <input
        {...props}
        id={inputId}
        name={name}
        aria-describedby={describedBy || undefined}
        aria-invalid={validationMessage ? true : props["aria-invalid"]}
        className={inputClasses}
      />

      {validationMessage ? (
        <p
          id={validationId}
          className="flex items-center gap-2 text-preset-5 text-brand-pink-700"
        >
          <span
            aria-hidden="true"
            className="size-[14px] shrink-0 bg-brand-neutral-900 [mask:url('/assets/alert.svg')_center/contain_no-repeat]"
          />
          <span>{validationMessage}</span>
        </p>
      ) : null}
    </div>
  );
}
