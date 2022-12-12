import React, { useState, useEffect } from "react";

import FileSaver from "file-saver";
import { Button } from "neetoui";
import { useQuery } from "react-query";

import article_reportsApi from "apis/Api/article_reports";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import ProgressBar from "components/Common/ProgressBar";

import Navbar from "./Navbar";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const consumer = createConsumer();

  const { refetch, isLoading: isDownloading } = useQuery(
    "downloading_report",
    () => downloadPdf(),
    { refetchOnWindowFocus: false, enabled: false }
  );

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
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="mt-20 grid w-1/2 place-items-center justify-center space-y-5 px-16 py-20">
          <h1>{message}</h1>
          <ProgressBar progress={progress} />
          <Button
            disabled={isLoading || isDownloading}
            label={isLoading ? "Please wait" : "Download"}
            loading={isLoading || isDownloading}
            onClick={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadReport;
