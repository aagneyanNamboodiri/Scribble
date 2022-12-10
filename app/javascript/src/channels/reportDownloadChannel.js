export const subscribeToReportDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
  generatePdf,
}) => {
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
