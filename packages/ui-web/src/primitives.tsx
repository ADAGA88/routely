import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { designTokens } from "@routely/design-tokens";
import { RoutelyIcon, type RoutelyIconName } from "./icons";

export interface RoutelyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet" | "destructive";
  trailingIcon?: RoutelyIconName;
  fullWidth?: boolean;
  loading?: boolean;
}

export function RoutelyButton({
  children,
  variant = "primary",
  trailingIcon,
  fullWidth = false,
  loading = false,
  className,
  type = "button",
  disabled,
  ...buttonProps
}: RoutelyButtonProps): ReactElement {
  const classes = [
    "routely-button",
    `routely-button--${variant}`,
    fullWidth ? "routely-button--full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      aria-busy={loading || undefined}
      className={classes}
      disabled={disabled || loading}
      type={type}
      {...buttonProps}
    >
      <span>{children}</span>
      {loading ? (
        <span aria-hidden="true" className="routely-button__spinner" />
      ) : trailingIcon && !loading ? (
        <RoutelyIcon name={trailingIcon} size={16} />
      ) : null}
    </button>
  );
}

export interface RoutelySurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  tone?: "default" | "muted";
}

export function RoutelySurface({
  children,
  className,
  tone = "default",
  ...surfaceProps
}: RoutelySurfaceProps): ReactElement {
  const classes = ["routely-surface", `routely-surface--${tone}`, className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classes} {...surfaceProps}>
      {children}
    </div>
  );
}

export interface RoutelyTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id: string;
  label: string;
  error?: string;
}

export function RoutelyTextField({
  id,
  label,
  error,
  className,
  ...inputProps
}: RoutelyTextFieldProps): ReactElement {
  const classes = ["routely-field__input", error ? "is-error" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="routely-field">
      <label className="routely-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        className={classes}
        id={id}
        {...inputProps}
      />
      {error ? (
        <p className="routely-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  maxWidth?: number;
}

export function PageContainer({
  children,
  maxWidth = designTokens.componentSizes.contentMaxWidth,
  className,
  style,
  ...containerProps
}: PageContainerProps): ReactElement {
  const classes = ["routely-page-container", className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={classes} style={{ ...style, maxWidth }} {...containerProps}>
      {children}
    </div>
  );
}
