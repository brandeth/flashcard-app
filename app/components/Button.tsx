import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export function Button({
  variant = "primary",
  iconLeft,
  iconRight,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const buttonStateClasses =
    "shadow-[inset_0_0_0_1px_var(--color-brand-neutral-900),2px_2px_0_0_var(--color-brand-neutral-900)] hover:not-disabled:shadow-[inset_0_0_0_1px_var(--color-brand-neutral-900),4px_4px_0_0_var(--color-brand-neutral-900)] focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_1px_var(--color-brand-neutral-900),3px_3px_0_0_var(--color-brand-blue-600)]";

  const variantClasses = {
    primary: "bg-brand-yellow-500 text-brand-neutral-900",
    secondary: "bg-brand-neutral-0 text-brand-neutral-900",
  } satisfies Record<ButtonVariant, string>;

  const classes = [
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-4 py-3 text-preset-4 leading-none transition-shadow duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
    buttonStateClasses,
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {iconLeft ? (
        <span className="inline-flex size-4 shrink-0 text-current [&_svg]:size-full">
          {iconLeft}
        </span>
      ) : null}
      {children ? <span>{children}</span> : null}
      {iconRight ? (
        <span className="inline-flex size-4 shrink-0 text-current [&_svg]:size-full">
          {iconRight}
        </span>
      ) : null}
    </button>
  );
}
