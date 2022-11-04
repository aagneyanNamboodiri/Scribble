import React, { useState, useEffect } from "react";

import { Typography, Button } from "neetoui";
import { useParams } from "react-router-dom";

import article_versionsApi from "apis/article_versions";

import { formatTime, getButtonLabel } from "./utils";
import VersionModal from "./VersionModal";

const VersionList = ({ fetchData, article }) => {
  const [loading, setLoading] = useState(true);
  const [versions, setVersions] = useState([]);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [versionId, setVersionId] = useState(0);
  const { id } = useParams();

  const fetchVersions = async () => {
    try {
      setLoading(true);
      const {
        data: { versions },
      } = await article_versionsApi.list(id);
      setVersions(versions);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = versionId => {
    setVersionId(versionId);
    setShowVersionModal(true);
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="border-l w-1/4 p-4">
      <Typography style="h3">Version History</Typography>
      <Typography className="text-gray-600" style="body2">
        {`Version history of ${article.title}`}
      </Typography>
      <div className="flex space-x-4 p-2">
        <Typography className="text-gray-600" style="body2">
          {formatTime(article.created_at)}
        </Typography>
        <Typography style="body2">Article Created</Typography>
      </div>
      {versions.map(version => (
        <div className="flex space-x-4 p-2" key={version.id}>
          <Typography className="text-gray-600" style="body2">
            {formatTime(version.time)}
          </Typography>
          <Button
            className="text-indigo-500"
            label={getButtonLabel(version)}
            style="link"
            onClick={() => handleClick(version.id)}
          />
        </div>
      ))}
      {showVersionModal && (
        <VersionModal
          articleId={id}
          fetchData={fetchData}
          setShowVersionModal={setShowVersionModal}
          showVersionModal={showVersionModal}
          versionId={versionId}
        />
      )}
    </div>
  );
};

export default VersionList;
