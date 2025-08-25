import { useCallback, useEffect, useState } from "react";
import type { Field } from "../schema";
import FormPage from "./FormPage";
import OutlineButton from "./OutlineButton";
import { useFormikContext } from "formik";
import FilledButton from "./FilledButton";

export interface Props {
  data: Field[];
}

const itemsPerPage = 3;

const FormPageSelector = ({ data }: Props) => {
  const [lastPage, setLastPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { validateForm } = useFormikContext();

  const startAt = (currentPage - 1) * itemsPerPage;
  const endAt = startAt + itemsPerPage;

  const pageInputs = data.slice(startAt, endAt);

  const validatePage = useCallback(async () => {
    let allowNext = true;
    const errors = await validateForm();
    for (const input of pageInputs) {
      const errorFound = Object.keys(errors).includes(input.id);
      if (errorFound) {
        allowNext = false;
        break;
      }
    }

    if (allowNext) {
      if (currentPage < lastPage) {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
      }
    }
  }, [validateForm, pageInputs, currentPage, lastPage]);

  useEffect(() => {
    const inputLength = data.length;
    if (inputLength) {
      const numberOfPages = Math.ceil(inputLength / itemsPerPage);
      setLastPage(numberOfPages);
    }
  }, [data]);

  const handleNext = async () => {
    validatePage();
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="grid grid-cols-subgrid col-span-full lg:col-span-7 gap-6 ">
      <FormPage fields={pageInputs} />

      <div className="grid grid-cols-subgrid col-span-4">
        <FilledButton
          type="button"
          className={"col-span-2  cursor-pointer"}
          onClick={handlePrev}
          disabled={Boolean(currentPage === 1)}
        >
          Prev
        </FilledButton>

        {currentPage !== lastPage ? (
          <FilledButton
            type="button"
            className="col-span-2  cursor-pointer"
            onClick={handleNext}
            disabled={Boolean(currentPage === lastPage)}
          >
            Next
          </FilledButton>
        ) : (
          <OutlineButton type="submit" className="col-span-2  cursor-pointer">
            Submit
          </OutlineButton>
        )}
      </div>
    </div>
  );
};

export default FormPageSelector;
