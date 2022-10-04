import React from "react";

import { Check, Close } from "neetoicons";
import { Typography } from "neetoui";

const ValidationMessages = ({ password }) => (
  <>
    <div className="flex">
      {password.length >= 6 ? <Check size="15" /> : <Close size="15" />}
      <Typography style="body3">
        Password should be atleast 6 characters long
      </Typography>
    </div>
    <div className="flex">
      {/[0-9]/.test(password) && /[a-zA-Z]/.test(password) ? (
        <Check size="15" />
      ) : (
        <Close size="15" />
      )}
      <Typography style="body3">
        Password should contain atleast 1 number and 1 alphabet
      </Typography>
    </div>
  </>
);
export default ValidationMessages;
