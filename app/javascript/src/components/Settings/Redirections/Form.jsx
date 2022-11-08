import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Typography } from "neetoui";
import { Button, Input } from "neetoui/formik";
import TooltipWrapper from "tooltipwrapper";

import redirectionsApi from "apis/Api/redirections";

import { INITIAL_VALUES, validationSchema } from "./constants";
import { buildInitialValues } from "./utils";

const Form = ({ isEditing, setAction, redirection, refetch }) => {
  const handleSubmit = async redirections => {
    try {
      isEditing
        ? await redirectionsApi.update(redirection.id, { redirections })
        : await redirectionsApi.create({ redirections });
      refetch();
    } catch (err) {
      logger.log(err);
    } finally {
      setAction(false);
    }
  };

  const handleEscapeKeyPress = ({ type, key }) => {
    if (type === "keydown" && key === "Escape") {
      setAction(false);
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={
        isEditing ? buildInitialValues(redirection) : INITIAL_VALUES
      }
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <FormikForm onKeyDown={e => handleEscapeKeyPress(e)}>
          <div className="flex justify-between bg-white p-3">
            <div className="flex w-4/5 space-x-5">
              <Input
                name="from_path"
                placeholder="from-path"
                prefix={
                  <Typography style="body3" weight="medium">
                    {`${window.location.hostname}/`}
                  </Typography>
                }
              />
              <Input
                name="to_path"
                placeholder="to-path"
                prefix={
                  <Typography style="body3" weight="medium">
                    {`${window.location.hostname}/`}
                  </Typography>
                }
              />
            </div>
            <div className="flex w-1/12 justify-between">
              <TooltipWrapper
                disabled={!(isValid && dirty)}
                position="bottom"
                content={
                  isEditing
                    ? "Please edit redirection to save"
                    : "Please enter to and from path to add redirection"
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
                type="reset"
                onClick={() => setAction(false)}
              />
            </div>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
