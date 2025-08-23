import { Helmet } from "react-helmet-async";
import MainTitle from "../components/MainTitle";
import { Form, Formik, type FormikHelpers } from "formik";
import response from "../../data/fields.json";
import type { Field, FormState } from "../schema";
import InputSelector from "../components/form-fields/InputSelector";
import OutlineButton from "../components/OutlineButton";
import useFormInitiator from "../hooks/useFormInitiator";

const HomePage = () => {
  const { data } = response;

  const { initialState, validationSchema } = useFormInitiator(data as Field[]);
  const handleSubmit = (values: FormState, { resetForm }: FormikHelpers<FormState>) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    resetForm();
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="VOIS KYC form" />
        <title>Register !</title>
      </Helmet>
      <main className="w-full h-full min-h-screen dark:bg-gray-950 flex flex-col gap-6 lg:gap-30 pt-3 lg:pt-10 items-center px-8 lg:px-20">
        <MainTitle className="self-start">Welcome to our family</MainTitle>
        <section className="w-full">
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="grid grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-12 lg:gap-y-16 dark:text-gray-300">
                {(data as Field[]).map((field, index) => (
                  <InputSelector key={`KYC Form input: ${index}`} field={field} />
                ))}
                <OutlineButton
                  type="submit"
                  className="col-span-2 col-start-2 lg:col-start-6 cursor-pointer"
                >
                  Submit
                </OutlineButton>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </>
  );
};

export default HomePage;
