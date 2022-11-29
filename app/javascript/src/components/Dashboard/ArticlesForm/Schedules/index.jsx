import React from "react";

import { Typography } from "neetoui";

import Card from "./Card";

const Schedules = ({
  schedules: { pending_schedules, completed_schedules },
  refetch,
}) =>
  pending_schedules.length + completed_schedules.length === 0 ? (
    <div className="grid place-items-center pt-4">
      <Typography style="h1" weight="medium">
        :/
      </Typography>
      <Typography style="h2" weight="medium">
        This article has no schedules
      </Typography>
    </div>
  ) : (
    <div className="p-4">
      <Typography style="h3">Article scheduling</Typography>
      <Typography className="text-gray-600" style="body2">
        Schedules for this article in Srcibble
      </Typography>
      {pending_schedules.map((schedule, idx) => (
        <div className="p-2" key={schedule.id}>
          <Card
            index={idx}
            refetch={refetch}
            schedule={schedule}
            schedulesCount={pending_schedules.length}
          />
        </div>
      ))}
      {completed_schedules.map(schedule => (
        <div className="p-2" key={schedule.id}>
          <Card schedule={schedule} />
        </div>
      ))}
    </div>
  );

export default Schedules;
