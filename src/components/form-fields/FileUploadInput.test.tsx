import { fireEvent, screen } from "@testing-library/react";
import type { Field } from "../../schema";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import FileUploadInput from "./FileUploadInput";

// Mock File preview
global.URL.createObjectURL = jest.fn(() => "mocked-url");

describe("FileUploadInput", () => {
  const fileField: Field = {
    id: "profile_picture",
    label: "Profile Picture",
    type: "file",
    required: true,
  };

  it("should render the label", () => {
    RenderWithFormik(<FileUploadInput field={fileField} />, {
      initialValues: { profile_picture: null },
    });

    expect(screen.getByLabelText("Profile Picture")).toBeInTheDocument();
  });

  it("should trigger file input when button is clicked", () => {
    RenderWithFormik(<FileUploadInput field={fileField} />, {
      initialValues: { profile_picture: null },
    });

    const input = screen.getByLabelText("Profile Picture");
    const button = screen.getByRole("button");

    // Spy on click
    const clickSpy = jest.spyOn(input, "click");
    fireEvent.click(button);

    expect(clickSpy).toHaveBeenCalled();
  });

  it("should update value when file is uploaded and display image", () => {
    RenderWithFormik(<FileUploadInput field={fileField} />, {
      initialValues: { profile_picture: "../../../public/vodafone-icon.svg" },
    });

    const input = screen.getByLabelText("Profile Picture") as HTMLInputElement;

    const file = new File(["dummy"], "avatar.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });

    // Formik should have the file as value
    expect(input.files?.[0]).toEqual(file);

    // Image should be rendered
    expect(screen.getByAltText("Uploaded Profile picture")).toBeInTheDocument();
  });

  it("should display error message when Formik has error", () => {
    RenderWithFormik(<FileUploadInput field={fileField} />, {
      initialValues: { profile_picture: null },
      initialErrors: { profile_picture: "required" },
      initialTouched: { profile_picture: true },
    });

    expect(screen.getByText("required")).toBeInTheDocument();
  });
});
