import React from "react";

import { Formik, Form as FormikForm } from "formik";
import Logger from "js-logger";
import { Check, Close } from "neetoicons";
import { Button, Input as FormikInput } from "neetoui/formik";

import categoriesApi from "apis/categories";

import { buildInitialValue, validationSchema } from "./constants";

import TooltipWrapper from "../../TooltipWrapper";

const Form = ({ category = {}, setAction, refetch, isEditing }) => {
  const handleSubmit = async name => {
    try {
      Object.keys(category).length === 0
        ? await categoriesApi.create(name)
        : await categoriesApi.update(category.id, name);
    } catch (err) {
      Logger.log(err);
    }
    refetch();
    setAction(false);
  };

  const handleEscapeKeyPress = e => {
    if ((e.type = "keydown" && e.key === "Escape")) {
      setAction(false);
    }
  };

  return (
    <Formik
      initialValues={buildInitialValue(category)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <FormikForm onKeyDown={e => handleEscapeKeyPress(e)}>
          <FormikInput
            name="name"
            placeholder="Category Name"
            type="text"
            suffix={
              <div className="flex">
                <TooltipWrapper
                  disabled={!(isValid && dirty)}
                  position="bottom"
                  content={
                    isEditing
                      ? "Please edit category to save"
                      : "Please enter category to add"
                  }
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
                  type="cancel"
                  onClick={() => {
                    setAction(false);
                  }}
                />
              </div>
            }
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
