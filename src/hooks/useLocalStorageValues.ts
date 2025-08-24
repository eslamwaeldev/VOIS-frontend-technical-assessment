import type { FormikErrors } from "formik";
import { useCallback, useEffect } from "react";

export interface UseLocalStorageValues {
  saveToLocalStorage: (value: unknown) => void;
}

const useLocalStorageValues = (
  fieldId: string,
  setValue: (
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<unknown>>
) => {
  //Handles setting the default value from the local storage
  useEffect(() => {
    let isMounted = true;
    const fieldLocalStorageValue = localStorage.getItem(fieldId);
    if (fieldLocalStorageValue) {
      if (isMounted) {
        const fieldDefaultValue = JSON.parse(fieldLocalStorageValue);
        setValue(fieldDefaultValue);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [fieldId, setValue]);

  const saveToLocalStorage = useCallback(
    (value: unknown) => {
      const localStorageValue = JSON.stringify(value);
      localStorage.setItem(fieldId, localStorageValue);
    },
    [fieldId]
  );

  return saveToLocalStorage;
};

export default useLocalStorageValues;
