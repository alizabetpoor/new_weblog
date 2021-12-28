const TextInput = (props) => {
  return (
    <div className="flex flex-col items-stretch">
      <label className="self-start" htmlFor={props.name}>
        {props.placeholder}:
      </label>
      <input
        {...props.formik.getFieldProps(props.name)}
        name={props.name}
        className={`${
          props.disabled && "opacity-60"
        } mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
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
