import React from "react";

import { Typography, Button } from "neetoui";

const ErrorPage = () => (
  <div className="flex w-full justify-center py-20">
    <div className="flex-col space-y-4">
      <div className=" space-y-10">
        <Typography style="h1" weight="medium">
          :/
        </Typography>
        <div className="space-y-2">
          <Typography style="h2" weight="medium">
            Now thats a bummer...
          </Typography>
          <Typography className="text-gray-600" style="body2">
            You are seeing this page because this is an invalid URL
          </Typography>
        </div>
        <Button
          label="Click here to goto home"
          style="primary"
          to="/articles"
        />
      </div>
    </div>
  </div>
);

export default ErrorPage;
