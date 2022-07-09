import PropTypes from "prop-types";
import { useField } from "formik";

export default function TextInput({ label, ...props }) {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
    </>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
};
