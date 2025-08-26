import { fireEvent, screen } from "@testing-library/dom";
import type { Field } from "../../schema";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import Select from "./Select";

jest.mock("../../hooks/useLocalStorageValues", () => {
  return jest.fn(() => jest.fn());
});

describe("Select", () => {
  const selectField: Field = {
    id: "country_selector",
    label: "Country",
    type: "select",
    options: ["Egypt", "France", "Italy"],
    required: true,
  };

  it("should render the label", () => {
    RenderWithFormik(<Select field={selectField} />);
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("should have all the options", () => {
    RenderWithFormik(<Select field={selectField} />);
    expect(screen.getByRole("option", { name: "Egypt" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "France" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Italy" })).toBeInTheDocument();
  });

  it("should update it's value on select and call saveToLocalStorage", () => {
    const mockSave = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const useLocalStorageValues = require("../../hooks/useLocalStorageValues");
    useLocalStorageValues.mockImplementation(() => mockSave);

    RenderWithFormik(<Select field={selectField} />, {
      initialValues: { country_selector: "" },
    });

    const input = screen.getByLabelText("Country");
    fireEvent.change(input, { target: { value: "France" } });

    expect(input).toHaveValue("France");
    expect(mockSave).toHaveBeenCalledWith("France");
  });

  it("should display error message when Formik has error", async () => {
    RenderWithFormik(<Select field={selectField} />, {
      initialValues: { country_selector: "" },
      initialErrors: { country_selector: "required" },
      initialTouched: { country_selector: true },
    });

    expect(screen.getByText("required")).toBeInTheDocument();
  });
});
