import React, { useState } from "react";

import { Clock } from "neetoicons";
import { Checkbox, Typography, Tag } from "neetoui";
import TooltipWrapper from "tooltipwrapper";

import { formatTime } from "../utils";

const Card = ({ article }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="border m-3 w-full space-y-2 p-4 shadow-md">
      <Checkbox checked={checked} onChange={() => setChecked(prev => !prev)} />
      <div className="flex justify-between">
        <Typography style="h3">{article.title}</Typography>
      </div>
      <div className="text-gray-800">
        <Typography style="body2">{article.body}</Typography>
      </div>
      <hr />
      <div className="flex w-full justify-between">
        <Tag className="bg-gray-100" label="Getting Started" />
        <div className="flex justify-between pt-1">
          <Clock size={18} />
          <TooltipWrapper
            content="2 hours ago"
            followCursor="horizontal"
            position="bottom"
          >
            <Typography className="pr-2 text-gray-500" style="body3">
              {formatTime(article.updated_at)}
            </Typography>
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
};

export default Card;
