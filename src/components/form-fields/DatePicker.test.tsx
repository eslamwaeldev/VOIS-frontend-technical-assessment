import { fireEvent, screen } from "@testing-library/react";
import type { Field } from "../../schema";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import DatePicker from "./DatePicker";

jest.mock("../../hooks/useLocalStorageValues", () => {
  return jest.fn(() => jest.fn());
});

describe("DatePicker", () => {
  const dateField: Field = {
    id: "birth_date",
    label: "Birth Date",
    type: "date",
    required: true,
  };

  it("should render the label", () => {
    RenderWithFormik(<DatePicker field={dateField} />, {
      initialValues: { birth_date: "" },
    });

    expect(screen.getByLabelText("Birth Date")).toBeInTheDocument();
  });

  it("should update its value on change and call saveToLocalStorage", () => {
    const mockSave = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const useLocalStorageValues = require("../../hooks/useLocalStorageValues");
    useLocalStorageValues.mockImplementation(() => mockSave);

    RenderWithFormik(<DatePicker field={dateField} />, {
      initialValues: { birth_date: "" },
    });

    const input = screen.getByLabelText("Birth Date");
    fireEvent.change(input, { target: { value: "2025-08-26" } });

    expect(input).toHaveValue("2025-08-26");
    expect(mockSave).toHaveBeenCalledWith("2025-08-26");
  });

  it("should display error message when Formik has error", () => {
    RenderWithFormik(<DatePicker field={dateField} />, {
      initialValues: { birth_date: "" },
      initialErrors: { birth_date: "required" },
      initialTouched: { birth_date: true },
    });

    expect(screen.getByText("required")).toBeInTheDocument();
  });
});
