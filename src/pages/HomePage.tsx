import { Helmet } from "react-helmet-async";
import MainTitle from "../components/MainTitle";
import { Form, Formik, type FormikHelpers } from "formik";
import response from "../../data/fields.json";
import type { Field, FormState } from "../schema";
import InputSelector from "../components/form-fields/InputSelector";
import OutlineButton from "../components/OutlineButton";
import useFormInitiator from "../hooks/useFormInitiator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { data } = response;
  const navigate = useNavigate();
  const { initialState, validationSchema } = useFormInitiator(data as Field[]);
  const handleSubmit = (values: FormState, { resetForm }: FormikHelpers<FormState>) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    toast.success("Thank you, form submitted successfully");
    resetForm();
    Object.keys(values).forEach((key) => {
      localStorage.removeItem(key);
    });
    navigate(`/thanks`);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="VOIS KYC form" />
        <title>Register !</title>
      </Helmet>
      <div className="w-full h-full min-h-screen dark:bg-vodafone-gray flex flex-col gap-6 lg:gap-30 pt-3 lg:py-10 items-center px-8 lg:px-20">
        <MainTitle className="self-start">Welcome to our family</MainTitle>
        <section className="w-full">
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="grid grid-cols-4 lg:grid-cols-12 gap-x-6 lg:gap-12 lg:gap-y-16 dark:text-gray-300">
                <div className="grid grid-cols-4  col-span-full lg:col-span-7 gap-x-6 gap-y-12 lg:gap-12 lg:gap-y-16 ">
                  {(data as Field[]).map((field, index) => (
                    <InputSelector key={`KYC Form input: ${index}`} field={field} />
                  ))}
                </div>
                <OutlineButton
                  type="submit"
                  className="col-span-2 col-start-2 lg:col-start-1 cursor-pointer"
                >
                  Submit
                </OutlineButton>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
};

export default HomePage;
