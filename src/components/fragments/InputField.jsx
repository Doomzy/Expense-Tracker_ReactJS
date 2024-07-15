function InputField({
  name,
  label,
  type,
  msg,
  placeholder,
  maxLength,
  max,
  value,
  handleChange,
  error,
}) {
  return (
    <div className="mt-2">
      <label className=" text-lg ms-2" htmlFor={name}>
        {label}
        <input
          required
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          max={max}
          min={1}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
        />
        {error ? (
          <p className=" ms-3 mt-1 text-xs text-red font-normal">{error}</p>
        ) : (
          <p className=" ms-3 mt-1 text-xs text-gray-600 font-normal">{msg}</p>
        )}
      </label>
    </div>
  );
}

export default InputField;
