import React from "react";

import { Formik, Form } from "formik";
import Logger from "js-logger";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import categoriesApi from "apis/categories";

import { INITIAL_VALUE, validationSchema } from "./constants";

const Create = ({ setIsCreating, refetch }) => {
  const handleSubmit = async name => {
    try {
      await categoriesApi.create(name);
    } catch (err) {
      Logger.log(err);
    }
    refetch();
    setIsCreating(false);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormikInput
          name="name"
          placeholder="Category Name"
          type="text"
          suffix={
            <div className="flex">
              <Button
                icon={() => <Check size={17} />}
                style="text"
                type="submit"
              />
              <Button
                icon={() => <Close size={17} />}
                style="text"
                type="cancel"
                onClick={() => setIsCreating(false)}
              />
            </div>
          }
        />
      </Form>
    </Formik>
  );
};

export default Create;
