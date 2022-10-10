import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography } from "neetoui";

import Row from "./Row";

const Redirections = () => {
  // eslint-disable-next-line no-unused-vars
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="flex w-full justify-center py-4">
      <div className="w-2/3 flex-col">
        <div className="space-y-10">
          <div className="flex-col space-y-2">
            <Typography style="h2" weight="medium">
              Redirections
            </Typography>
            <Typography className="text-gray-600" style="body2">
              Create and configure redirection rules to send users from old
              links to new links. All redirections are performed with 301 status
              codes to be SEO friendly.
            </Typography>
          </div>
        </div>
        <div className="w-full flex-col space-y-3 bg-indigo-100 p-5">
          <div className="flex justify-between">
            <Typography className="text-gray-600" style="body3" weight="medium">
              FROM PATH
            </Typography>
            <Typography className="text-gray-600" style="body3" weight="medium">
              TO PATH
            </Typography>
            <Typography className="text-gray-600" style="body3" weight="medium">
              ACTIONS
            </Typography>
          </div>
          <Row />
          <div className="flex">
            <Plus
              color="#667eea"
              size="20"
              onClick={() => setIsCreating(true)}
            />
            <Typography className="text-indigo-500" style="body2">
              Add new category
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirections;
