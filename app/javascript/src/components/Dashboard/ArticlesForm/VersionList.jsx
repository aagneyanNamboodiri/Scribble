import React, { useState, useEffect } from "react";

import { Typography, Button } from "neetoui";
import { useParams } from "react-router-dom";

import versionsApi from "apis/versions";

import { formatTime } from "./utils";

const VersionList = () => {
  const [loading, setLoading] = useState(true);
  const [versions, setVersions] = useState([]);
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
        <div className="flex" key={version.id}>
          <Typography className="pt-1 text-gray-600" style="body2">
            {formatTime(version.time)}
          </Typography>
          <Button
            className="text-indigo-500"
            label={`Article ${version.status} `}
            style="text"
          />
        </div>
      ))}
    </div>
  );
};

export default VersionList;
