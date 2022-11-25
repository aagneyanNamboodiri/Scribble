import React, { useState, useEffect } from "react";

import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

import schedulesApi from "apis/Api/schedules";

import Card from "./Card";

const Schedules = () => {
  const [loading, setLoading] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const { id } = useParams();

  const fetchSchedules = async () => {
    const payload = {
      article_id: id,
    };
    try {
      setLoading(true);
      const {
        data: { schedules },
      } = await schedulesApi.list(payload);
      setSchedules(schedules);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Typography style="h3">Article scheduling</Typography>
      <Typography className="text-gray-600" style="body2">
        Schedules for this article in Srcibble
      </Typography>
      {schedules.map(schedule => (
        <div className="p-2" key={schedule.id}>
          <Card schedule={schedule} />
        </div>
      ))}
    </div>
  );
};

export default Schedules;
