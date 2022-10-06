import React from "react";

import { Formik, Form } from "formik";
import Logger from "js-logger";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import categoriesApi from "apis/categories";

import { buildInitialValue, validationSchema } from "./constants";

const Create = ({ category = {}, setIsCreatingOrEditing, refetch }) => {
  const handleSubmit = async name => {
    try {
      Object.keys(category).length === 0
        ? await categoriesApi.create(name)
        : await categoriesApi.update(category.id, name);
    } catch (err) {
      Logger.log(err);
    }
    refetch();
    setIsCreatingOrEditing(false);
  };

  return (
    <Formik
      initialValues={buildInitialValue(category)}
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
                onClick={() => setIsCreatingOrEditing(false)}
              />
            </div>
          }
        />
      </Form>
    </Formik>
  );
};

export default Create;
