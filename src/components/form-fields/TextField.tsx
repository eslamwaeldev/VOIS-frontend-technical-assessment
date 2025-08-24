import { useField } from "formik";
import type { Field } from "../../schema";
import type { ChangeEvent } from "react";
import useLocalStorageValues from "../../hooks/useLocalStorageValues";

export interface Props {
  field: Field;
}

const TextField = ({ field }: Props) => {
  const [fieldProps, meta, helpers] = useField(field.id);
  const saveToLocalStorage = useLocalStorageValues(field.id, helpers.setValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    helpers.setValue(value);
    saveToLocalStorage(value);
  };

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
        onChange={handleChange}
      />
      {meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default TextField;
