import React from "react";

import { Typography } from "neetoui";

import { useOrganizationState } from "contexts/organizations";

const Header = () => {
  const { siteName } = useOrganizationState();

  return (
    <div className="border-b flex justify-center py-2">
      <Typography style="h2" weight="medium">
        {siteName}
      </Typography>
    </div>
  );
};

export default Header;
