import { useField } from "formik";
import { type ChangeEvent, type HTMLAttributes } from "react";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";
import useLocalStorageValues from "../../hooks/useLocalStorageValues";
import type { Field } from "../../schema";

export interface Props extends HTMLAttributes<HTMLSelectElement> {
  field: Field;
}

const Select = ({ field, className, ...props }: Props) => {
  const [fieldProps, meta, helpers] = useField(field.id);
  const saveToLocalStorage = useLocalStorageValues(field.id, helpers.setValue);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    helpers.setValue(value);
    saveToLocalStorage(value);
  };
  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={field.id}>{field.label}</label>
      <select
        {...fieldProps}
        name={field.id}
        id={field.id}
        value={fieldProps.value ? fieldProps.value : "disabled"}
        className={`appearance-none h-11 rounded-lg border-2 p-2 cursor-pointer ${
          meta.error ? "border-red-500" : "border-gray-700 dark:border-gray-300"
        }  ${className}`}
        {...props}
        onChange={handleChange}
      >
        <option value="disabled">Select your answer</option>
        {field.options?.map((option, index) => {
          return (
            <option key={`${index}- ${option}`} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <ChevronDownIcon className="absolute right-4 top-9.5 cursor-pointer pointer-events-none" />
      {meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default Select;
