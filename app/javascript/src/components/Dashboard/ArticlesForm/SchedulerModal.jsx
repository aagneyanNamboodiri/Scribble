import React, { useState } from "react";

import { DatePicker, Modal, Typography, Button } from "neetoui";
import TooltipWrapper from "tooltipwrapper";

import schedulesApi from "apis/Api/schedules";

import { convertTimeToUTC, isTimeInvalid } from "./utils";

const SchedulerModal = ({
  setShowModal,
  showModal,
  articleId,
  fetchSchedules,
  statusToScheduleTo,
}) => {
  const [time, setTime] = useState("");

  const handleScheduleCreate = async () => {
    const payload = {
      schedule: {
        article_status: statusToScheduleTo,
        scheduled_time: convertTimeToUTC(time),
      },
      article_id: articleId,
    };
    try {
      await schedulesApi.create(payload);
    } catch (error) {
      logger.error(error);
    } finally {
      fetchSchedules();
      setShowModal(false);
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>
        <Typography style="h2">Schedule article</Typography>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <div>
          <Typography>Pick a date and hour</Typography>
          <DatePicker
            showTime
            dateFormat="DD/MM/YYYY"
            getPopupContainer={triggerNode => triggerNode.parentNode}
            timeFormat="HH"
            type="date"
            onChange={(_, dateString) => setTime(dateString)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex space-x-2">
        <TooltipWrapper
          disabled={isTimeInvalid(time)}
          position="bottom"
          content={
            time === ""
              ? "Please select a time"
              : "Schedule time can only be in the future"
          }
        >
          <Button
            disabled={isTimeInvalid(time)}
            label="Continue"
            onClick={handleScheduleCreate}
          />
        </TooltipWrapper>
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default SchedulerModal;
