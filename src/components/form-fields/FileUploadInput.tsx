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
    <div className={`flex flex-col gap-2 w-full h-full relative`}>
      <label htmlFor={field.id} className="absolute -top-3.5 left-4 bg-gray-50 z-10 px-1">
        <span className="opacity-70">{field.label}</span>
      </label>
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
        className={`rounded-lg border-dashed border-2 p-2 aspect-[2/1] max-w-full cursor-pointer flex items-center justify-center  ${
          meta.error ? "border-vodafone-red" : "border-gray-700 dark:border-gray-300"
        } `}
        onClick={handleUpload}
        type="button"
      >
        {isFileUploaded(fieldProps.value) ? (
          <img
            height={250}
            width={500}
            src={URL.createObjectURL(fieldProps.value as File)}
            alt="Uploaded Profile picture"
            className="max-w-full max-h-full object-cover"
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
