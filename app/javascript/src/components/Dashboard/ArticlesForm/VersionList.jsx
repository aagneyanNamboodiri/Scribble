import React, { useState, useEffect } from "react";

import { Typography, Button } from "neetoui";
import { useParams } from "react-router-dom";

import versionsApi from "apis/versions";

import { formatTime } from "./utils";
import VersionModal from "./VersionModal";

const VersionList = ({ setFetchedArticle }) => {
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
      } = await versionsApi.list(id);
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
        Version history of article-titles
      </Typography>
      {versions.map(version => (
        <div className="flex space-x-4 p-2" key={version.id}>
          <Typography className="text-gray-600" style="body2">
            {formatTime(version.time)}
          </Typography>
          <Button
            className="text-indigo-500"
            style="link"
            label={`Article ${
              version.status === "published" ? version.status : "drafted"
            } `}
            onClick={() => handleClick(version.id)}
          />
        </div>
      ))}
      {showVersionModal && (
        <VersionModal
          articleId={id}
          setFetchedArticle={setFetchedArticle}
          setShowVersionModal={setShowVersionModal}
          showVersionModal={showVersionModal}
          versionId={versionId}
        />
      )}
    </div>
  );
};

export default VersionList;
