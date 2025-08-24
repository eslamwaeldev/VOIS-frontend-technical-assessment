import { useField } from "formik";
import type { Field } from "../../schema";

export interface Props {
  field: Field;
}

const TextField = ({ field }: Props) => {
  const [fieldProps, meta] = useField(field.id);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.id}>{field.label}</label>
      <input
        {...fieldProps}
        type="text"
        id={field.id}
        name={field.id}
        value={fieldProps.value ? fieldProps.value : ""}
        className={`h-11 rounded-lg border-2 p-2 cursor-pointer ${
          meta.error ? "border-red-500" : "border-gray-700 dark:border-gray-300"
        }`}
      />
      {meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default TextField;
