import React, { useEffect, useState } from "react";

import { ExternalLink } from "neetoicons";
import { Typography, Button } from "neetoui";

import preferencesApi from "apis/preferences";

import NavItem from "./NavItem";

const Navbar = () => {
  const cookie = document.cookie;
  const [loading, setLoading] = useState(true);
  const [isPassword, setIsPassword] = useState(false);

  // eslint-disable-next-line consistent-return
  const shouldLoginOrNot = () => {
    if (!isPassword) return false;
    else if (isPassword && !cookie) {
      return true;
    }
  };

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data } = await preferencesApi.list();
      setIsPassword(data.is_password);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);
  if (loading) {
    return <div />;
  }

  return (
    <div className="border-b flex justify-between p-5">
      <div className="flex">
        <Typography className="font-semibold" style="h3">
          Scribble
        </Typography>
        <div className="pl-4">
          <NavItem iconClass="ri-add-fill " name="Articles" path="/articles" />
          <NavItem
            iconClass="ri-file-download-fill"
            name="Settings"
            path="/settings"
          />
        </div>
      </div>
      <Button
        icon={() => <ExternalLink size={17} />}
        label="Preview"
        style="secondary"
        to={shouldLoginOrNot() ? "/login" : "/public"}
      />
    </div>
  );
};

export default Navbar;
