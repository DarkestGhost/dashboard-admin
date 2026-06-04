const Button = ({ children, variant, size, className = "", ...props }) => {
  const baseStyle =
    "font-vazir_regular rounded-md transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-700 disabled:cursor-not-allowed disabled:opacity-75";

  const variants = {
    primary: "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700",
    success: "bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700",
    danger: "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700",
    outline: "border border-blue-600 text-blue-700 hover:bg-blue-600 hover:text-white",
    ghost: "border border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
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