import React from "react";
import { Formik, Form, type FormikConfig, type FormikValues } from "formik";
import { render } from "@testing-library/react";

const RenderWithFormik = (
  ui: React.ReactNode,
  formikConfig: Partial<FormikConfig<FormikValues>> = {}
) => {
  const defaultConfig: FormikConfig<FormikValues> = {
    initialValues: {},
    onSubmit: jest.fn(),
    ...formikConfig,
  };

  return render(
    <Formik {...defaultConfig}>
      <Form>{ui}</Form>
    </Formik>
  );
};

export default RenderWithFormik;
