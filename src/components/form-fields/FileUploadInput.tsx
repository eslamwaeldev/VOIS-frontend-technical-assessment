import { useField } from "formik";
import { useRef, type ChangeEvent } from "react";
import UploadIcon from "../../assets/icons/UploadIcon";
import type { Field } from "../../schema";

export interface Props {
  field: Field;
}

const FileUploadInput = ({ field }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fieldProps, meta, helpers] = useField(field.id);

  const isFileUploaded = (value: unknown): value is File => {
    return value instanceof File;
  };
  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    helpers.setValue(files?.[0]);
  };

  return (
    <div className={`flex flex-col gap-2 w-full h-full`}>
      <label htmlFor={field.id}>{field.label}</label>
      <input
        {...fieldProps}
        ref={fileInputRef}
        type="file"
        name={field.id}
        id={field.id}
        value={undefined}
        accept="image/*"
        className="hidden w-full h-full"
        onChange={handleChange}
      />
      <button
        className={`rounded-lg border-dashed border-2 p-2 aspect-[2/1] cursor-pointer flex items-center justify-center  ${
          meta.error ? "border-red-500" : "border-gray-700 dark:border-gray-300"
        } `}
        onClick={handleUpload}
        type="button"
      >
        {isFileUploaded(fieldProps.value) ? (
          <img
            height={200}
            width={200}
            src={URL.createObjectURL(fieldProps.value as File)}
            alt="Uploaded Profile picture"
          />
        ) : (
          <UploadIcon />
        )}
      </button>
      {meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
    </div>
  );
};

export default FileUploadInput;
