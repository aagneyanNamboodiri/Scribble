import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { Button } from "neetoui";

import article_reportsApi from "apis/Api/article_reports";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/Common/ProgressBar";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const generatePdf = async () => {
    try {
      await article_reportsApi.create();
    } catch (error) {
      logger.error(error);
    }
  };

  const downloadPdf = async () => {
    try {
      const { data } = await article_reportsApi.download();
      FileSaver.saveAs(data, "scribble-report.pdf");
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false);
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <div className="p-4">
      <h1>{message}</h1>
      <ProgressBar progress={progress} />
      <Button label="Download" loading={isLoading} onClick={downloadPdf} />
    </div>
  );
};

export default DownloadReport;
