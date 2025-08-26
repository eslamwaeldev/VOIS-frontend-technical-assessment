import { useEffect, useState } from "react";

import * as Yup from "yup";
import { FieldTypes, type Field, type FormState } from "../schema";

const FILE_SIZE = 2 * 1024 * 1024 * 7; // 14MB

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const today = new Date();
const checkDate: Yup.TestFunction<Date | null | undefined, Yup.AnyObject> = (value) => {
  if (!value) return true;
  const selectedDate = new Date(value ?? "");
  const isDateValid = Boolean(selectedDate > today);
  return isDateValid;
};

const FileValidation: Yup.TestFunction<unknown | null | undefined, Yup.AnyObject> = (value) => {
  if (!value) return true;
  const isSizeOk = Boolean((value as File).size <= FILE_SIZE);
  return isSizeOk;
};

const useFormInitiator = (data: Field[]) => {
  const [initialState, setInitialState] = useState<FormState>({});
  const [validationSchema, setValidationSchema] = useState<
    Yup.ObjectSchema<typeof initialState> | undefined
  >(undefined);

  useEffect(() => {
    let isMounted = true;

    const initialValues = data.reduce((acc, field) => {
      return {
        ...acc,
        [field.id]:
          field.type === FieldTypes.multiChoice
            ? []
            : field.type === FieldTypes.file
            ? undefined
            : "",
      };
    }, {});

    const validationSchemaCreator = Yup.object().shape(
      data.reduce((acc, field) => {
        let validation;
        if (field.required) {
          switch (field.type) {
            case FieldTypes.multiChoice:
              validation = Yup.array()
                .required("This Field is required")
                .min(field.min ?? 1)
                .max(field.max ?? 1);
              break;

            case FieldTypes.file:
              validation = Yup.mixed()
                .required("This field is required")
                .test("fileSize", "File size is too large", FileValidation);
              break;

            case FieldTypes.date:
              validation = Yup.date()
                .required("This field is required")
                .test("dateValidity", "Date must be after today", checkDate);
              break;

            case FieldTypes.email:
              validation = Yup.string()
                .required("Email is required")
                .test("is-valid-email", "Must be a valid email", (value) =>
                  value ? emailRegex.test(value) : true
                );
              break;

            default:
              validation = Yup.string().required("This field is required ");
              break;
          }
          return {
            ...acc,
            [field.id]: validation,
          };
        } else {
          switch (field.type) {
            case FieldTypes.multiChoice:
              validation = Yup.array()
                .nullable()
                .min(field.min ?? 1)
                .max(field.max ?? 1);
              break;

            case FieldTypes.file:
              validation = Yup.mixed()
                .nullable()
                .test("fileSize", "File size is too large", FileValidation);
              break;

            case FieldTypes.date:
              validation = Yup.date()
                .nullable()
                .test("dateValidity", "Date must be after today", checkDate);
              break;

            case FieldTypes.email:
              validation = Yup.string()
                .test("is-valid-email", "Must be a valid email", (value) =>
                  value ? emailRegex.test(value) : true
                )
                .nullable();
              break;

            default:
              validation = Yup.string().nullable();
              break;
          }

          return {
            ...acc,
            [field.id]: validation,
          };
        }
      }, {})
    );

    if (isMounted) {
      setInitialState(initialValues);
      setValidationSchema(validationSchemaCreator);
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  return { initialState, validationSchema };
};

export default useFormInitiator;
