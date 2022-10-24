import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Typography, PageLoader } from "neetoui";
import { Input as FormikInput, Button, Checkbox } from "neetoui/formik";

import organizationsApi from "apis/organizations";

import { validationSchema } from "./constants";
import PasswordValidator from "./PasswordValidator";

import TooltipWrapper from "../../TooltipWrapper";

const General = () => {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState([1, 1]);
  const [siteName, setSiteName] = useState("");
  const [noChangesToSettings, setNoChangesToSettings] = useState(true);
  const [previouslyPasswordProtected, setPreviouslyPasswordProtected] =
    useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const handleSubmit = async value => {
    try {
      if (!value.passwordProtection) setPassword("");
      const organization = {
        site_name: value.siteName,
        is_password: value.passwordProtection,
        password: value.passwordProtection ? password : "",
      };
      await organizationsApi.update({ organization });
      await fetchOrganizations();
      setNoChangesToSettings(true);
    } catch (err) {
      logger.log(err);
    }
  };

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const { data } = await organizationsApi.list();
      if (data.password_digest) setPassword(data.password_digest);

      if (data.is_password) {
        setIsPasswordValid([1, 1]);
      }
      setPreviouslyPasswordProtected(data.is_password);
      setSiteName(data.site_name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
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
          passwordProtection: previouslyPasswordProtected,
        }}
        onSubmit={handleSubmit}
      >
        {({ dirty, ...props }) => (
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
                checked={props.values.passwordProtection}
                id="checkbox_name"
                label="Password protect knowledgebase"
                name="passwordProtection"
              />
              {props.values.passwordProtection && (
                <FormikInput
                  disabled={isEditingPassword}
                  label="Password"
                  name="password"
                  placeholder="A secure password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onClick={setIsEditingPassword(true)}
                />
              )}
              {props.values.passwordProtection && (
                <PasswordValidator
                  password={password}
                  setIsPasswordValid={setIsPasswordValid}
                />
              )}
              <div className="flex space-x-2">
                <TooltipWrapper
                  disabled={!dirty}
                  position="bottom"
                  content={
                    dirty
                      ? "Please ensure site name is present and password is valid"
                      : "No changes to save"
                  }
                >
                  <Button
                    label="Save Changes"
                    type="submit"
                    disabled={
                      !dirty || !(isPasswordValid[0] * isPasswordValid[1])
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
        )}
      </Formik>
    </div>
  );
};

export default General;
