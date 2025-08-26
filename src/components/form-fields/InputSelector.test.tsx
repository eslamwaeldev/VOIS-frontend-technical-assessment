import { screen } from "@testing-library/react";
import RenderWithFormik from "../../test-utils/RenderWithFormik";
import InputSelector from "./InputSelector";
import { FieldTypes, type Field } from "../../schema";

describe("InputSelector", () => {
  const renderInput = (field: Field) =>
    RenderWithFormik(<InputSelector field={field} />, {
      initialValues: { [field.id]: "" },
    });

  it("should render Select when type is select", () => {
    renderInput({ id: "country", label: "Country", type: FieldTypes.select });
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("should render Radio when type is radioButton", () => {
    renderInput({ id: "gender", label: "Gender", type: FieldTypes.radioButton });
    expect(screen.getByText("Gender")).toBeInTheDocument();
  });

  it("should render MultiChoice when type is multiChoice", () => {
    renderInput({ id: "hobbies", label: "Hobbies", type: FieldTypes.multiChoice });
    expect(screen.getByText("Hobbies")).toBeInTheDocument();
  });

  it("should render FileUploadInput when type is file", () => {
    renderInput({ id: "avatar", label: "Profile image", type: FieldTypes.file });
    expect(screen.getByLabelText("Profile image")).toBeInTheDocument();
  });

  it("should render DatePicker when type is date", () => {
    renderInput({ id: "birthday", label: "Birthday", type: FieldTypes.date });
    expect(screen.getByLabelText("Birthday")).toBeInTheDocument();
  });

  it("should render TextArea when type is textArea", () => {
    renderInput({ id: "bio", label: "Bio", type: FieldTypes.textArea });
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
  });

  it("should render TextField as default", () => {
    renderInput({ id: "username", label: "Full name", type: FieldTypes.text });
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });
});
