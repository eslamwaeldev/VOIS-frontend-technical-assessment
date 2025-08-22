import { Helmet } from "react-helmet-async";
import MainTitle from "../components/MainTitle";
import { Form, Formik, type FormikHelpers } from "formik";
import useFormState from "../hooks/useFormInitiator";

const HomePage = () => {
  const { initialState, validationSchema } = useFormState();
  const handleSubmit = <T,>(values: T, { resetForm }: FormikHelpers<T>) => {
    console.log(values);
    resetForm();
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="VOIS KYC form" />
        <title>Register !</title>
      </Helmet>
      <main className="w-full h-full min-h-screen flex flex-col gap-6 pt-3 lg:pt-10 items-center px-8">
        <MainTitle className="self-start">Welcome to our family</MainTitle>
        <section className="grid grid-cols-4 lg:grid-cols-12 gap-6 lg:gap-8">
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form></Form>
          </Formik>
        </section>
      </main>
    </>
  );
};

export default HomePage;
