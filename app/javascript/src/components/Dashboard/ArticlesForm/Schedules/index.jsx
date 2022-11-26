import React from "react";

import { Typography } from "neetoui";

import Card from "./Card";

const Schedules = ({ schedules, refetch }) => (
  <div className="p-4">
    <Typography style="h3">Article scheduling</Typography>
    <Typography className="text-gray-600" style="body2">
      Schedules for this article in Srcibble
    </Typography>
    {schedules.map((schedule, idx) => (
      <div className="p-2" key={schedule.id}>
        <Card
          index={idx}
          refetch={refetch}
          schedule={schedule}
          schedulesCount={schedules.length}
        />
      </div>
    ))}
  </div>
);

export default Schedules;
