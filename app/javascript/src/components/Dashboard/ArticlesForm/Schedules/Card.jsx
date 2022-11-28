import React, { useState } from "react";

import { Checkmark } from "neetoicons";
import { Typography, Button } from "neetoui";

import schedulesApi from "apis/Api/schedules";

import Alert from "./Alert";

import { getHour } from "../utils";

const Card = ({ schedule, refetch, schedulesCount, index }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = id => {
    if (schedulesCount > 1 && index !== schedulesCount - 1) {
      setIsAlertOpen(true);
    } else handleDelete(id);
  };

  const handleDelete = async id => {
    try {
      await schedulesApi.destroy(id);
    } catch (err) {
      logger.log(err);
    } finally {
      refetch();
    }
  };

  return schedule.schedule_status === "pending" ? (
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
        <Button
          label="Cancel schedule"
          style="danger"
          onClick={() => handleClick(schedule.id)}
        />
      </div>
      {isAlertOpen && (
        <Alert
          handleDelete={handleDelete}
          isAlertOpen={isAlertOpen}
          schedule={schedule}
          setIsAlertOpen={setIsAlertOpen}
        />
      )}
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
};

export default Card;
