import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import schedulesApi from "apis/Api/schedules";

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

  return <div>{JSON.stringify(schedules)}</div>;
};

export default Schedules;
