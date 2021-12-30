const TextInput = (props) => {
  let inputClass = `${
    props.checkvalid && !Object.keys(props.formik.errors).includes(props.name)
      ? "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500"
      : null
  } ${
    props.disabled && "opacity-60"
  } mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`;
  return (
    <div className="flex flex-col items-stretch">
      <label className="self-start" htmlFor={props.name}>
        {props.placeholder}:
      </label>
      <input
        {...props.formik.getFieldProps(props.name)}
        name={props.name}
        className={inputClass}
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        id={props.name}
        disabled={props.disabled}
      />
      {props.formik.errors[props.name] && props.formik.touched[props.name] && (
        <div className="text-red-500 self-start">
          {props.formik.errors[props.name]}
        </div>
      )}
    </div>
  );
};

export default TextInput;
