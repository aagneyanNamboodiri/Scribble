import React from "react";

import { Typography, Button } from "neetoui";

const NoArticles = () => (
  <div className="flex h-full w-full items-center justify-center align-middle">
    <div className="space-y-6 pt-6">
      <div className="space-y-2">
        <Typography style="h2" weight="medium">
          You dont have any articles
        </Typography>
        <Typography className="text-gray-600" style="body2">
          Spread your ideas to the world!
        </Typography>
      </div>
      <Button
        label="Click here to add articles"
        style="primary"
        to="/articles/create"
      />
    </div>
  </div>
);

export default NoArticles;
