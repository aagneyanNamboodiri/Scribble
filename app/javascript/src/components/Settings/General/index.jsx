import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Typography, Checkbox, Button, PageLoader } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import preferencesApi from "apis/preferences";

import { validationSchema } from "./constants";
import ValidationMessages from "./ValidationMessages";

const General = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState([1, 1]);
  const [siteName, setSiteName] = useState("");

  const handleSubmit = values => {
    logger.log(values, password, checked);
  };

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data } = await preferencesApi.list();
      if (data.password_digest) setPassword(data.password_digest);
      setChecked(data.is_password);
      setSiteName(data.site_name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  //TODO : Clicking cancel button should revert the state back to what was fetched from DB
  //TODO : If password was set to blank and saved, password field checkbox should be unchecked

  return (
    <div className="flex w-full justify-center py-4">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          siteName,
          password,
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex-col space-y-4">
            <div className="space-y-10">
              <div className="space-y-2">
                <Typography style="h2" weight="medium">
                  General Settings
                </Typography>
                <Typography className="text-gray-600" style="body2">
                  Configure general attributes of scribble
                </Typography>
              </div>
              <FormikInput
                helpText="Customize the sitename which is used to show the site name"
                label="Site Name"
                name="siteName"
              />
            </div>
            <hr />
            <Checkbox
              checked={checked}
              id="checkbox_name"
              label="Password protect knowledgebase"
              onChange={() => setChecked(prev => !prev)}
            />
            {checked && (
              <FormikInput
                label="Password"
                name="password"
                placeholder="A secure password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            )}
            {checked && (
              <ValidationMessages
                password={password}
                setIsPasswordValid={setIsPasswordValid}
              />
            )}
            <div className="flex space-x-2">
              <Button
                label="Save Changes"
                type="submit"
                disabled={
                  checked === true &&
                  !(isPasswordValid[0] * isPasswordValid[1] > 0)
                }
              />
              <Button label="Cancel" style="text" type="reset" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default General;
