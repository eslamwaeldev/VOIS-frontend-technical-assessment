import { FieldTypes, type Field } from "../../schema";
import DatePicker from "./DatePicker";
import FileUploadInput from "./FileUploadInput";

import MultiChoice from "./MultiChoice";
import Radio from "./Radio";
import Select from "./Select";
import TextArea from "./TextArea";
import TextField from "./TextField";

export interface Props {
  field: Field;
}

const InputSelector = ({ field }: Props) => {
  switch (field.type) {
    case FieldTypes.text:
      return (
        <div className="col-span-4">
          <TextField field={field} />
        </div>
      );

    case FieldTypes.select:
      return (
        <div className="col-span-4">
          <Select field={field} />
        </div>
      );

    case FieldTypes.radioButton:
      return (
        <div className="col-span-2">
          <Radio field={field} />
        </div>
      );

    case FieldTypes.multiChoice:
      return (
        <div className="col-span-2">
          <MultiChoice field={field} />
        </div>
      );

    case FieldTypes.file:
      return (
        <div className="col-span-4">
          <FileUploadInput field={field} />
        </div>
      );

    case FieldTypes.date:
      return (
        <div className="col-span-4">
          <DatePicker field={field} />
        </div>
      );

    case FieldTypes.textArea:
      return (
        <div className="col-span-4">
          <TextArea field={field} />
        </div>
      );

    default:
      return (
        <div className="col-span-4">
          <TextField field={field} />
        </div>
      );
  }
};

export default InputSelector;
