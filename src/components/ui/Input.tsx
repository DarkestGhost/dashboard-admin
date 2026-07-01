import type { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  label?: string;
  error?: { message?: string };
  className?: string;
}

const Input = ({ id, label, error, className = "", ...props }: InputProps) => {
  return (
    <div className={"relative w-full"}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-vazir_regular pb-2 mr-2 text-zinc-700 dark:text-zinc-300 transition-all duration-300 ease-linear"
        >
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 font-vazir_regular border-2 focus:outline-none focus:ring-2 transition-all duration-300 ease-linear rounded-md shadow-md bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 ${error ? "border-red-400 focus:ring-red-400" : "border-blue-400 dark:border-blue-500 focus:ring-blue-400 dark:focus:ring-blue-500"} ${className}`}
        id={id}
        name={id}
        {...props}
      />
      {error?.message && (
        <p className="absolute text-xs font-vazir_regular text-red-500 dark:text-red-400 pt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
