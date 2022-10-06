import React from "react";

import { Formik, Form } from "formik";
import { Check } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import { INITIAL_VALUE, validationSchema } from "./constants";

const Create = ({ setIsCreating }) => {
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = values => {
    setIsCreating(false);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="flex">
          <FormikInput name="title" placeholder="Category Name" type="text" />
          <Button icon={() => <Check size={18} />} style="text" type="submit" />
        </div>
      </Form>
    </Formik>
  );
};

export default Create;
