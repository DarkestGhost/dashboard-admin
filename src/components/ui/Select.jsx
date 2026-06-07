const Select = ({
  id,
  label,
  error,
  options = [],
  className = "",
  placeholder = "انتخاب کنید ...",
  ...props
}) => {
  return (
    <div className={"relative"}>
      {label && <label htmlFor="category" className="block text-sm font-vazir_regular pb-2 mr-2 text-zinc-700 dark:text-zinc-300">
        {label}
      </label>}
      <select
        className={`w-full px-3 py-2 font-vazir_regular border-2 focus:outline-none focus:ring-2 transition-all duration-300 ease-linear rounded-md shadow-md bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 ${error ? "border-red-400 focus:ring-red-400" : "border-blue-400 dark:border-blue-500 focus:ring-blue-400 dark:focus:ring-blue-500"} ${className ? className : " "}`}
        id={id}
        name={id}
        {...props}
      >
        <option value="" className="text-gray-600 dark:text-zinc-400 dark:bg-zinc-700">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug} className="dark:bg-zinc-700 dark:text-zinc-100">
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="absolute text-xs font-vazir_regular text-red-500 dark:text-red-400 pt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Select;
