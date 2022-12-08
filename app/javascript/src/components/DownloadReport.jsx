import React, { useState, useEffect } from "react";

import article_reportsApi from "apis/Api/article_reports";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  const generatePdf = async () => {
    try {
      await article_reportsApi.create();
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      const { data } = await article_reportsApi.download();
      saveAs({ blob: data, fileName: "scribble_articles_report.pdf" });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 3000);
  }, []);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  return <h1>{message}</h1>;
};

export default DownloadReport;
