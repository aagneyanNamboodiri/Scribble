import React from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Button, Input } from "neetoui/formik";

import { INITIAL_VALUES, validationSchema } from "./constants";

const RoutesForm = ({ setIsCreating }) => {
  const handleSubmit = values => {
    logger.log(values);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="flex justify-between bg-white p-3">
          <div className="flex w-4/5 space-x-5">
            <Input name="fromPath" placeholder="scribble.com/" />
            <Input name="toPath" placeholder="scribble.com/" />
          </div>
          <div className="flex w-1/12 justify-between">
            <Button
              icon={() => <Check size={17} />}
              style="text"
              type="submit"
            />
            <Button
              disabled={false}
              icon={() => <Close size={17} />}
              style="text"
              onClick={() => setIsCreating(false)}
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default RoutesForm;
