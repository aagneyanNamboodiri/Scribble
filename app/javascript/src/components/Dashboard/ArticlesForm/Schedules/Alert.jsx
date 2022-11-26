import React from "react";

import { Alert as NeetoUIAlert } from "neetoui";

import { buildDeleteAlertMessage } from "../utils";

const Alert = ({ schedule, handleDelete, setIsAlertOpen, isAlertOpen }) => (
  <NeetoUIAlert
    isOpen={isAlertOpen}
    message={buildDeleteAlertMessage(schedule)}
    title="Confirm deletion of schedule"
    onClose={() => setIsAlertOpen(false)}
    onSubmit={() => {
      handleDelete(schedule.id);
      setIsAlertOpen(false);
    }}
  />
);

export default Alert;
