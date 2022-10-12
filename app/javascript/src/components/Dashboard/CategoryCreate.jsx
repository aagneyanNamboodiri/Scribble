import React from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import categoriesApi from "apis/categories";

import {
  NEW_CATEGORY_FORM_VALIDATION_SCHEMA,
  NEW_CATEGORY_INITIAL_VALUE,
} from "./constants";

const CategoryCreate = ({ setIsCreating, refetch }) => {
  const handleSubmit = async values => {
    try {
      await categoriesApi.create({ name: values.category });
    } catch (err) {
      logger.log(err);
    } finally {
      refetch();
      setIsCreating(false);
    }
  };

  return (
    <Formik
      initialValues={NEW_CATEGORY_INITIAL_VALUE}
      validationSchema={NEW_CATEGORY_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormikInput
          name="category"
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
                type="reset"
              />
            </div>
          }
        />
      </Form>
    </Formik>
  );
};

export default CategoryCreate;
