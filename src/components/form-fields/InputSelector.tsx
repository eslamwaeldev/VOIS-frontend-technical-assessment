import { FieldTypes, type Field } from "../../schema";

import MultiChoice from "./MultiChoice";
import Radio from "./Radio";
import Select from "./Select";
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

    default:
      break;
  }
};

export default InputSelector;
