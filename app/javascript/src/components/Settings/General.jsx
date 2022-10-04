import React, { useState } from "react";

import { Typography, Input, Checkbox, Button } from "neetoui";

import ValidationMessages from "./ValidationMessages";

const General = () => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");

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
            value="Spinkart"
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
        {password.length >= 1 && <ValidationMessages password={password} />}
        <div className="flex space-x-2">
          <Button label="Save Changes" />
          <Button label="Cancel" style="text" />
        </div>
      </div>
    </div>
  );
};

export default General;
