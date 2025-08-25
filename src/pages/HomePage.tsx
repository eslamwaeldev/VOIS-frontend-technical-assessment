import { Form, Formik, type FormikHelpers } from "formik";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import response from "../../data/fields.json";
import FormPageSelector from "../components/FormPageSelector";
import MainTitle from "../components/MainTitle";
import useFormInitiator from "../hooks/useFormInitiator";
import type { Field, FormState } from "../schema";

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
      <div className="w-full h-full min-h-screen dark:bg-vodafone-gray flex flex-col gap-6 lg:gap-8 pt-3 lg:py-10 items-center px-8 lg:px-20">
        <MainTitle className="self-start">Welcome to our family</MainTitle>
        <section className="w-full">
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {() => (
              <Form className="grid grid-cols-4 lg:grid-cols-12 dark:text-gray-300">
                <FormPageSelector data={data as Field[]} />
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
};

export default HomePage;
