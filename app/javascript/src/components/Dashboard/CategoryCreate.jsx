import React from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Input as FormikInput, Button } from "neetoui/formik";

import categoriesApi from "apis/Api/categories";

import {
  NEW_CATEGORY_FORM_VALIDATION_SCHEMA,
  NEW_CATEGORY_INITIAL_VALUE,
} from "./constants";

import TooltipWrapper from "../TooltipWrapper";

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

  const handleEscapeKeyPress = ({ type, key }) => {
    if (type === "keydown" && key === "Escape") {
      setIsCreating(false);
    }
  };

  return (
    <Formik
      initialValues={NEW_CATEGORY_INITIAL_VALUE}
      validationSchema={NEW_CATEGORY_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form>
          <FormikInput
            name="category"
            placeholder="Category Name"
            type="text"
            suffix={
              <div className="flex">
                <TooltipWrapper
                  content="Please enter category to save"
                  disabled={!(isValid && dirty)}
                  position="bottom"
                >
                  <Button
                    icon={() => <Check size={17} />}
                    style="text"
                    type="submit"
                  />
                </TooltipWrapper>
                <Button
                  disabled={false}
                  icon={() => <Close size={17} />}
                  style="text"
                  onClick={() => setIsCreating(false)}
                />
              </div>
            }
            onKeyDown={e => handleEscapeKeyPress(e)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CategoryCreate;
