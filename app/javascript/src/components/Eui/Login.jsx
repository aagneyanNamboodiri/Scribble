import React from "react";

import { Formik, Form } from "formik";
import { Typography } from "neetoui";
import { Input as FormikInput, Button } from "neetoui/formik";

import loginApi from "apis/login";

import { INITIAL_VALUES, VALIDATION_SCHEMA } from "./constants";

import { usePreferenceState } from "../../contexts/preferencesContext";

const Login = () => {
  const handleSubmit = async password => {
    try {
      loginApi.create(password);
    } catch (err) {
      logger.log(err);
    }
  };
  const { siteName } = usePreferenceState();

  return (
    <div className="flex w-full justify-center py-4">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-col space-y-4">
            <div className="space-y-10">
              <div className="space-y-2">
                <a href="https://imgbb.com/">
                  <img
                    alt="Control-V"
                    border="0"
                    src="https://i.ibb.co/VQcxdJ1/Control-V.png"
                  />
                </a>
                <Typography style="h2" weight="medium">
                  {siteName} has password protection!
                </Typography>
                <Typography className="text-gray-600" style="body2">
                  Enter the password to access all these awesome articles!
                </Typography>
              </div>
              <FormikInput
                helpText="Customize the sitename which is used to show the site name"
                label="Site Name"
                name="password"
              />
            </div>
            <div className="flex space-x-2">
              <Button label="Submit" type="submit" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
