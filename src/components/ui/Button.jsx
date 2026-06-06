const Button = ({ children, variant, size, className = "", ...props }) => {
  const baseStyle =
    "font-vazir_regular rounded-md transition-all duration-300 ease-linear cursor-pointer disabled:bg-gray-200 disabled:dark:bg-zinc-700 disabled:text-gray-700 disabled:dark:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-75";

  const variants = {
    primary: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:text-blue-700 dark:hover:text-blue-300",
    success: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 hover:text-green-700 dark:hover:text-green-300",
    danger: "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 hover:text-red-700 dark:hover:text-red-200",
    outline: "border border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white",
    ghost: "border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-100"
  };

  const sizes = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
  };

  const finalClassNames = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={finalClassNames} {...props}>
      {children}
    </button>
  );
};

export default Button;