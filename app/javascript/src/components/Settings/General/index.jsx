import React, { useEffect, useState } from "react";

import { Typography, Input, Checkbox, Button, PageLoader } from "neetoui";

import preferencesApi from "apis/preferences";

import ValidationMessages from "./ValidationMessages";

const General = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState([1, 1]);
  const [preferences, setPreferences] = useState({});
  const [siteName, setSiteName] = useState("");

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data } = await preferencesApi.list();
      setPreferences(data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setSettingsValues = () => {
    if (preferences.password_digest) setPassword(preferences.password_digest);
    setChecked(preferences.is_password);
    setSiteName(preferences.site_name);
  };

  useEffect(() => {
    fetchPreferences();
    setSettingsValues();
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
          <Input
            helpText="Customize the sitename which is used to show the site name"
            label="Site Name"
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
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
          <Input
            label="Password"
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
            disabled={
              checked === true && !(isPasswordValid[0] * isPasswordValid[1] > 0)
            }
          />
          <Button label="Cancel" style="text" />
        </div>
      </div>
    </div>
  );
};

export default General;
