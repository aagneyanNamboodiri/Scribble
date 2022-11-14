import React from "react";

import { Search } from "neetoicons";
import { Typography, Input } from "neetoui";

import { useOrganizationState } from "contexts/organization";

const Header = ({ setIsSearchModalOpen, isSearchEnabled }) => {
  const { siteName } = useOrganizationState();

  return (
    <div className="border-b flex justify-center py-2">
      {isSearchEnabled && (
        <div>
          <Input
            className="pl-2"
            placeholder="CMD + K to search"
            prefix={<Search />}
            onClick={() => setIsSearchModalOpen(true)}
          />
        </div>
      )}
      <Typography className="m-auto" style="h2" weight="medium">
        {siteName}
      </Typography>
    </div>
  );
};

export default Header;
