import React, { useState } from "react";

import { DatePicker, Modal, Typography, Button } from "neetoui";

import schedulesApi from "apis/Api/schedules";

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
        article_status:
          statusToScheduleTo === "published" ? "published" : "draft",
        scheduled_time: time,
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
        <Typography style="h2">Modal</Typography>
      </Modal.Header>
      <Modal.Body className="space-y-6">
        <div>
          <Typography>Date</Typography>
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
      <Modal.Footer>
        <Button
          label="Continue"
          onClick={() => {
            handleScheduleCreate(false);
          }}
        />
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
