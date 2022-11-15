import React from "react";

import { Formik, Form as FormikForm } from "formik";
import Logger from "js-logger";
import { Check, Close } from "neetoicons";
import { Button, Input as FormikInput } from "neetoui/formik";
import TooltipWrapper from "tooltipwrapper";

import categoriesApi from "apis/Api/categories";

import { buildInitialValue, validationSchema } from "./constants";

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

  const handleEscapeKeyPress = ({ type, key }) => {
    if (type === "keydown" && key === "Escape") {
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
            nakedInput
            name="name"
            placeholder="Category Name"
            size="large"
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
