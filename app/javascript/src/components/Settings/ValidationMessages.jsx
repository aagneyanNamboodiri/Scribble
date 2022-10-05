import React, { useEffect } from "react";

import { Check, Close } from "neetoicons";
import { Typography } from "neetoui";

import { alphabetRegex, numericalRegex } from "./constants";

const ValidationMessages = ({ password, setIsPasswordValid }) => {
  useEffect(() => {
    const passwordValidity = [
      alphabetRegex.test(password) && numericalRegex.test(password),
      password.length >= 6,
    ];
    setIsPasswordValid(passwordValidity);
  }, [password]);

  return (
    <>
      <div className="flex">
        {password.length >= 6 ? (
          <Check color="#00BA88" size="16" />
        ) : (
          <Close color="#F56A58" size="16" />
        )}
        <Typography style="body3">Have atleast 6 characters long</Typography>
      </div>
      <div className="flex">
        {numericalRegex.test(password) && alphabetRegex.test(password) ? (
          <Check color="#00BA88" size="16" />
        ) : (
          <Close color="#F56A58" size="16" />
        )}
        <Typography style="body3">
          Include atleast 1 number and 1 alphabet
        </Typography>
      </div>
    </>
  );
};
export default ValidationMessages;
