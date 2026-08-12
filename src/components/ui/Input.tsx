import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-50";

const labelClasses = "mb-1.5 block text-sm font-medium text-gray-700";

interface FieldWrapperProps {
  label?: string;
  id?: string;
  error?: string;
}

export function Input({
  id,
  label,
  error,
  className,
  ...props
}: FieldWrapperProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <input id={id} className={cn(fieldClasses, "h-11", className)} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Textarea({
  id,
  label,
  error,
  className,
  ...props
}: FieldWrapperProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <textarea id={id} className={cn(fieldClasses, "min-h-28 py-2.5", className)} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  id,
  label,
  error,
  options,
  className,
  ...props
}: FieldWrapperProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<SelectOption | string>;
  }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <select id={id} className={cn(fieldClasses, "h-11", className)} {...props}>
        {options.map((option) =>
          typeof option === "string" ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ),
        )}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
