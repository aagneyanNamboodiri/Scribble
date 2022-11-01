import React from "react";

import { Typography, Input } from "neetoui";

import { useOrganizationState } from "contexts/organizations";

const Header = ({ setIsSearchModalOpen }) => {
  const { siteName } = useOrganizationState();

  return (
    <div className="border-b flex justify-center py-2">
      <div>
        <Input
          className="w-full pl-2"
          placeholder="Search for article title"
          onClick={() => setIsSearchModalOpen(true)}
        />
      </div>
      <Typography className="m-auto" style="h2" weight="medium">
        {siteName}
      </Typography>
    </div>
  );
};

export default Header;
