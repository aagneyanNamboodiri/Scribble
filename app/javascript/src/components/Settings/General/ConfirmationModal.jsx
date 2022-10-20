import React from "react";

import { Alert } from "neetoui";

const ConfirmationModal = ({ setPasswordAlertOpen, setChecked }) => (
  <div className="p-4">
    <Alert
      isOpen={open}
      message="Clicking on save changes now will delete the password, and remove the password protection"
      title="You are removing password protection"
      onClose={() => {
        setChecked(true);
        setPasswordAlertOpen(false);
      }}
      onSubmit={() => {
        setPasswordAlertOpen(false);
      }}
    />
  </div>
);

export default ConfirmationModal;
