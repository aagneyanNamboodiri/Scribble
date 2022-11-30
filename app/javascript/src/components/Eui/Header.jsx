import React from "react";

import { Typography, Kbd } from "neetoui";

import { useOrganizationState } from "contexts/organization";

const Header = ({ setIsSearchModalOpen, isSearchEnabled }) => {
  const { siteName } = useOrganizationState();

  return (
    <div className="border-b flex justify-center p-2">
      {isSearchEnabled && (
        <div
          className="border rounded flex space-x-2 p-2"
          onClick={() => setIsSearchModalOpen(true)}
        >
          <Kbd keyName="⌘" />
          <p>+</p>
          <Kbd keyName="K" />
          <Typography className="text-gray-600" style="body2">
            To search
          </Typography>
        </div>
      )}
      <Typography className="m-auto" style="h2" weight="medium">
        {siteName}
      </Typography>
    </div>
  );
};

export default Header;
