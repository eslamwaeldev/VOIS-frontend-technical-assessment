import type { Field } from "../schema";
import InputSelector from "./form-fields/InputSelector";

export interface Props {
  fields: Field[];
}

const FormPage = ({ fields }: Props) => {
  return (
    <div className="grid grid-cols-4  col-span-full lg:col-span-7 gap-6 ">
      {(fields as Field[]).map((field, index) => (
        <InputSelector key={`KYC Form input: ${index}`} field={field} />
      ))}
    </div>
  );
};

export default FormPage;
