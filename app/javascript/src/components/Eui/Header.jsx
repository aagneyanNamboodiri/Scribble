import React from "react";

import { Typography } from "neetoui";

const Header = ({ siteName }) => (
  <div className="flex justify-center py-2">
    <Typography style="h2" weight="medium">
      {siteName}
    </Typography>
  </div>
);

export default Header;
