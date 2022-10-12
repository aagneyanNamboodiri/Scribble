import React from "react";

import { PageLoader, Typography } from "neetoui";

const NotFound = () => (
  <div className="flex w-full justify-center py-20">
    <div className="flex-col space-y-4">
      <div className=" space-y-10">
        <div className="p-1">
          <PageLoader />
        </div>
        <div className="space-y-2">
          <Typography style="h2" weight="medium">
            The eternal loading page (Error 404)
          </Typography>
          <Typography className="text-gray-600" style="body2">
            You are seeing this page because the article doesn't exist.
          </Typography>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
