import { useField } from "formik";
import { type ChangeEvent } from "react";
import type { Field } from "../../schema";
import useLocalStorageValues from "../../hooks/useLocalStorageValues";

export interface Props {
  field: Field;
}

const Radio = ({ field }: Props) => {
  const [fieldProps, meta, helpers] = useField(field.id);
  const saveToLocalStorage = useLocalStorageValues(field.id, helpers.setValue);
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    helpers.setValue(value);
    saveToLocalStorage(value);
  };
  return (
    <div
      className={`flex flex-col gap-2 border-2 ${
        meta.error ? "border-red-500" : "border-gray-700 dark:border-gray-300"
      }  px-4 py-2 rounded-lg relative`}
    >
      <label
        className="absolute -top-4 left-4 bg-gray-50 dark:bg-gray-950 px-0.5"
        htmlFor={field.id}
      >
        {field.label} :
      </label>
      {field.options?.map((option, index) => {
        return (
          <div key={`${option} input no: ${index}`} className="flex gap-1">
            <input
              {...fieldProps}
              id={option}
              value={option}
              type="radio"
              name={field.id}
              onChange={handleCheckBoxChange}
              checked={Boolean(fieldProps.value === option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        );
      })}
      {meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default Radio;
