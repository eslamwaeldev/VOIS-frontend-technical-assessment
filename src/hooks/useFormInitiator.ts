import { useEffect, useState } from "react";
import response from "../../data/fields.json";
import { FieldTypes } from "../schema";
import * as Yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024 * 7; // 14MB

const useFormInitiator = () => {
  const [initialState, setInitialState] = useState<object>({});
  const [validationSchema, setValidationSchema] = useState<
    Yup.ObjectSchema<typeof initialState> | undefined
  >(undefined);
  const { data } = response;

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

    const validationSchemaCreator = Yup.object(
      data.reduce((acc, field) => {
        if (field.required) {
          let validation;

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
                .test("fileSize", "File size is too large", (value) => {
                  if (!value) return true;
                  const isSizeOk = Boolean((value as File).size <= FILE_SIZE);
                  return isSizeOk;
                });
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
          return acc;
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
