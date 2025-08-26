import { screen, fireEvent } from "@testing-library/react";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import Radio from "./Radio";

jest.mock("../../hooks/useLocalStorageValues", () => {
  return jest.fn(() => jest.fn());
});

describe("Radio", () => {
  const radioField = {
    id: "gender",
    label: "Gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
  };

  it("should render the field label and all options", () => {
    RenderWithFormik(<Radio field={radioField} />);

    expect(screen.getByText("Gender")).toBeInTheDocument();

    radioField.options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it("should update it's value on select and call saveToLocalStorage", () => {
    const mockSave = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const useLocalStorageValues = require("../../hooks/useLocalStorageValues");
    useLocalStorageValues.mockImplementation(() => mockSave);

    RenderWithFormik(<Radio field={radioField} />, {
      initialValues: { gender: "" },
    });

    const input = screen.getByLabelText("Male");
    fireEvent.click(input);

    expect(input).toBeChecked();
    expect(mockSave).toHaveBeenCalledWith("Male");
  });

  it("should select a value when clicked", () => {
    RenderWithFormik(<Radio field={radioField} />);

    const maleRadio = screen.getByLabelText("Male");
    fireEvent.click(maleRadio);

    expect(maleRadio).toBeChecked();
  });

  it("should change selection when another option is clicked", () => {
    RenderWithFormik(<Radio field={radioField} />);

    const male = screen.getByLabelText("Male");
    const female = screen.getByLabelText("Female");

    fireEvent.click(male);
    expect(male).toBeChecked();
    expect(female).not.toBeChecked();

    fireEvent.click(female);
    expect(female).toBeChecked();
    expect(male).not.toBeChecked();
  });
});
