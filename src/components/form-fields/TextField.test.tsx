import { screen, fireEvent } from "@testing-library/react";
import type { Field } from "../../schema";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import TextField from "./TextField";

// Mock the localStorage hook
jest.mock("../../hooks/useLocalStorageValues", () => {
  return jest.fn(() => jest.fn());
});

describe("TextField", () => {
  const textField: Field = {
    id: "fullname",
    label: "Full name",
    type: "text",
    required: true,
  };

  it("should render a label", () => {
    RenderWithFormik(<TextField field={textField} />, {
      initialValues: { fullname: "" },
    });

    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });

  it("should update it's value when typing and calls saveToLocalStorage", () => {
    const mockSave = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const useLocalStorageValues = require("../../hooks/useLocalStorageValues");
    useLocalStorageValues.mockImplementation(() => mockSave);

    RenderWithFormik(<TextField field={textField} />, {
      initialValues: { fullname: "" },
    });

    const input = screen.getByLabelText("Full name");
    fireEvent.change(input, { target: { value: "eslam" } });

    expect(input).toHaveValue("eslam");
    expect(mockSave).toHaveBeenCalledWith("eslam");
  });

  it("should display error message when Formik has error", async () => {
    RenderWithFormik(<TextField field={textField} />, {
      initialValues: { fullname: "" },
      initialErrors: { fullname: "required" },
      initialTouched: { fullname: true },
    });

    expect(screen.getByText("required")).toBeInTheDocument();
  });
});
