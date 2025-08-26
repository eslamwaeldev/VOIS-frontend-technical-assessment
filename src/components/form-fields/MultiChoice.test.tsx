import { screen, fireEvent } from "@testing-library/react";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import MultiChoice from "./MultiChoice";

jest.mock("../../hooks/useLocalStorageValues", () => {
  return jest.fn(() => jest.fn());
});

describe("MultiChoice", () => {
  const multiField = {
    id: "hobbies",
    label: "Hobbies",
    type: "multiChoice",
    options: ["Reading", "Gaming", "Traveling"],
  };

  it("should render the field label and all options", () => {
    RenderWithFormik(<MultiChoice field={multiField} />);

    expect(screen.getByText("Hobbies")).toBeInTheDocument();

    multiField.options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it("should check a value when clicked", () => {
    RenderWithFormik(<MultiChoice field={multiField} />);

    const readingCheckbox = screen.getByLabelText("Reading");
    fireEvent.click(readingCheckbox);

    expect(readingCheckbox).toBeChecked();
  });

  it("should update it's value on select and call saveToLocalStorage", () => {
    const mockSave = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const useLocalStorageValues = require("../../hooks/useLocalStorageValues");
    useLocalStorageValues.mockImplementation(() => mockSave);

    RenderWithFormik(<MultiChoice field={multiField} />);

    const input = screen.getByLabelText("Gaming");
    fireEvent.click(input);

    expect(input).toBeChecked();
    expect(mockSave).toHaveBeenCalledWith(["Gaming"]);
  });

  it("should remove a value when clicked again", () => {
    RenderWithFormik(<MultiChoice field={multiField} />, {
      initialValues: {
        hobbies: ["Reading"],
      },
    });

    const readingCheckbox = screen.getByLabelText("Reading");
    expect(readingCheckbox).toBeChecked();

    fireEvent.click(readingCheckbox);

    expect(readingCheckbox).not.toBeChecked();
  });

  it("should select multiple options", () => {
    RenderWithFormik(<MultiChoice field={multiField} />);

    const reading = screen.getByLabelText("Reading");
    const gaming = screen.getByLabelText("Gaming");

    fireEvent.click(reading);
    fireEvent.click(gaming);

    expect(reading).toBeChecked();
    expect(gaming).toBeChecked();
  });
});
