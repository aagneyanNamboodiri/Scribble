import React from "react";

import { Typography } from "neetoui";

import { usePreferenceState } from "../../contexts/preferencesContext";

const Header = () => {
  const { siteName } = usePreferenceState();

  return (
    <div className="border-b flex justify-center py-2">
      <Typography style="h2" weight="medium">
        {siteName}
      </Typography>
    </div>
  );
};

export default Header;
