import React from "react";

import { Formik, Form } from "formik";
import { Check, Close } from "neetoicons";
import { Typography } from "neetoui";
import { Button, Input } from "neetoui/formik";

import redirectionsApi from "apis/redirections";

import { INITIAL_VALUES, validationSchema } from "./constants";
import { buildInitialValues } from "./utils";

const RoutesForm = ({ isEditing, setAction, redirection, refetch }) => {
  const handleSubmit = async redirections => {
    try {
      isEditing
        ? await redirectionsApi.update(redirection.id, { redirections })
        : await redirectionsApi.create({ redirections });
    } catch (err) {
      logger.log(err);
    } finally {
      setAction(false);
      refetch();
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
      <Form>
        <div className="flex justify-between bg-white p-3">
          <div className="flex w-4/5 space-x-5">
            <Input
              name="from_path"
              placeholder="scribble.com/"
              prefix={
                <Typography style="body3" weight="medium">
                  localhost:3000/
                </Typography>
              }
            />
            <Input
              name="to_path"
              placeholder="scribble.com/"
              prefix={
                <Typography style="body3" weight="medium">
                  localhost:3000/
                </Typography>
              }
            />
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
              onClick={() => setAction(false)}
            />
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default RoutesForm;
