import { useField } from "formik";
import { useRef, type ChangeEvent } from "react";
import Calendar from "../../assets/icons/Calendar";
import type { Field } from "../../schema";
import useLocalStorageValues from "../../hooks/useLocalStorageValues";

export interface Props {
  field: Field;
}

const DatePicker = ({ field }: Props) => {
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [fieldProps, meta, helpers] = useField(field.id);

  const saveToLocalStorage = useLocalStorageValues(field.id, helpers.setValue);

  const handleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    helpers.setValue(value);
    saveToLocalStorage(value);
  };
  return (
    <div className={`flex flex-col gap-2 relative cursor-pointer`}>
      <label htmlFor={field.id}>{field.label}</label>
      <input
        {...fieldProps}
        type="date"
        ref={dateInputRef}
        name={field.id}
        id={field.id}
        value={fieldProps.value ? fieldProps.value : ""}
        className={`h-11 appearance-none rounded-lg border-2 p-2 cursor-pointer ${
          meta.error && fieldProps.value
            ? "border-vodafone-red"
            : "border-gray-700 dark:border-gray-300"
        }`}
        onClick={handleClick}
        onChange={handleChange}
      />
      <Calendar className="absolute right-4 top-9.5 !cursor-pointer pointer-events-none" />
      {meta.error && fieldProps.value && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default DatePicker;
