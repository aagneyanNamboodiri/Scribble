import React from "react";

import { Typography, Button } from "neetoui";

const Header = ({ siteName }) => (
  <div className="flex justify-center py-2">
    <Typography style="h2" weight="medium">
      {siteName}
    </Typography>
    <Button label="Developer's button" to="/articles" />
  </div>
);

export default Header;
