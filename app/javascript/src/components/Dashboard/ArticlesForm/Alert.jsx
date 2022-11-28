import React from "react";

import { Alert as NeetoUIAlert } from "neetoui";

import { buildUpdateAlertMessage } from "./utils";

const Alert = ({
  values,
  showAlert,
  setShowAlert,
  submitValues,
  time,
  status,
}) => (
  <NeetoUIAlert
    isOpen={showAlert}
    message={buildUpdateAlertMessage({ status, time })}
    title="Confirm update?"
    onClose={() => setShowAlert(false)}
    onSubmit={() => {
      submitValues(values);
      setShowAlert(false);
    }}
  />
);

export default Alert;
