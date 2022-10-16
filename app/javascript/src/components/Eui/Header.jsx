import React from "react";

import { Typography, Button } from "neetoui";

import { usePreferenceState } from "../../contexts/preferencesContext";

const Header = () => {
  const { siteName } = usePreferenceState();

  return (
    <div className="flex justify-center py-2">
      <Typography style="h2" weight="medium">
        {siteName}
      </Typography>
      <Button label="Developer's button" to="/articles" />
    </div>
  );
};

export default Header;
