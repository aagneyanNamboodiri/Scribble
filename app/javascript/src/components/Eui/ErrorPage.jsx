import React from "react";

import { Typography, Button } from "neetoui";

const ErrorPage = ({ error }) => (
  <div className="flex w-full justify-center py-20">
    <div className="flex-col space-y-4">
      <div className=" space-y-10">
        <Typography style="h1">:/</Typography>
        <div className="space-y-2">
          <Typography style="h2" weight="medium">
            {error === "404"
              ? "Now Thats a bummer..."
              : "There are no articles published"}
          </Typography>
          <Typography className="text-gray-600" style="body2">
            {error === "404"
              ? "You are seeing this page because this article doesn't exist."
              : "Please come back later"}
          </Typography>
        </div>
        {error === "404" && (
          <Button
            label="Click here to goto the first article"
            style="primary"
            to="/public"
          />
        )}
      </div>
    </div>
  </div>
);

export default ErrorPage;
