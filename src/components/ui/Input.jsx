const Input = ({ id, label, error, className = "", ...props }) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={id}
        className="block text-sm font-vazir_regular pb-2 mr-2"
      >
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 font-vazir_regular border-2 focus:outline-none focus:ring-2 transition-all duration-300 ease-linear rounded-md shadow-md ${error ? "border-red-400 focus:ring-red-400" : "border-blue-400 focus:ring-blue-400"} ${className ? className : " "}`}
        id={id}
        name={id}
        {...props}
      />
      {error && (
        <p className="absolute text-xs font-vazir_regular text-red-700 pt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
