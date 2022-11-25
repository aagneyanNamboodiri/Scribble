import React from "react";

import { Checkmark } from "neetoicons";
import { Typography, Button } from "neetoui";

import { getHour } from "../utils";

const Card = ({ schedule }) =>
  schedule.schedule_status === "pending" ? (
    <div className="rounded border border-black p-3">
      <div className="flex space-x-10 p-1">
        <div>
          <Typography className=" text-gray-700" style="body2">
            Article scheduled to{" "}
            <span className="font-bold">
              {schedule.article_status === "draft" ? "draft " : "publish "}
            </span>
            at{" "}
          </Typography>
          <span className="font-medium">
            {getHour(schedule.scheduled_time)}
          </span>
        </div>
        <Button label="Cancel schedule" style="danger" />
      </div>
    </div>
  ) : (
    <div className="rounded border border-gray-600 bg-gray-300 p-3">
      <div className="flex space-x-10 p-1">
        <Checkmark className="mt-2" />
        <div>
          <Typography className=" text-gray-700" style="body2">
            Article{" "}
            <span className="font-bold text-gray-700">
              {schedule.article_status === "published"
                ? "published"
                : "drafted"}
            </span>{" "}
            at{" "}
          </Typography>
          <span className="font-medium">
            {getHour(schedule.scheduled_time)}
          </span>
        </div>
      </div>
    </div>
  );

export default Card;
