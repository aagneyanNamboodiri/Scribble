import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Typography, Checkbox, PageLoader } from "neetoui";
import { Input as FormikInput, Button } from "neetoui/formik";

import preferencesApi from "apis/preferences";

import { validationSchema } from "./constants";
import PasswordValidator from "./PasswordValidator";

import TooltipWrapper from "../../TooltipWrapper";

const General = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState([1, 1]);
  const [siteName, setSiteName] = useState("");
  const [noChangesToSettings, setNoChangesToSettings] = useState(true);

  const handleSubmit = async value => {
    try {
      const preference = {
        site_name: value.siteName,
        is_password: checked,
        password_digest: checked ? password : "",
      };
      await preferencesApi.update({ preference });
      await fetchPreferences();
      setNoChangesToSettings(true);
    } catch (err) {
      logger.log(err);
    }
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
        <Form onChange={() => setNoChangesToSettings(false)}>
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
              <PasswordValidator
                password={password}
                setIsPasswordValid={setIsPasswordValid}
              />
            )}
            <div className="flex space-x-2">
              <TooltipWrapper
                content="No changes to save"
                disabled={noChangesToSettings}
                position="bottom"
              >
                <Button
                  label="Save Changes"
                  type="submit"
                  disabled={
                    (checked === true &&
                      !(isPasswordValid[0] * isPasswordValid[1] > 0)) ||
                    noChangesToSettings
                  }
                />
              </TooltipWrapper>
              <TooltipWrapper
                content="No changes to cancel"
                disabled={noChangesToSettings}
                position="bottom"
              >
                <Button
                  disabled={noChangesToSettings}
                  label="Cancel"
                  style="text"
                  type="reset"
                  onClick={() => window.location.reload()}
                />
              </TooltipWrapper>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default General;
