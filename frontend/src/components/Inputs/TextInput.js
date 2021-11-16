const TextInput = (props) => {
  return (
    <div className="flex flex-col items-stretch">
      <label className="self-start" htmlFor={props.name}>
        {props.placeholder}:
      </label>
      <input
        {...props.formik.getFieldProps(props.name)}
        name={props.name}
        className="border-2 border-gray-400 p-1 rounded-md"
        placeholder={props.placeholder}
        type={props.type ? props.type : "text"}
        id={props.name}
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
