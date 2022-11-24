import React, { useState, useEffect } from "react";

import { Typography } from "neetoui";
import { useParams } from "react-router-dom";

import article_versionsApi from "apis/Api/article_versions";

import Card from "./Card";
import Modal from "./Modal";

const VersionList = ({ fetchData, article, categories }) => {
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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Typography style="h3">Version History</Typography>
      <Typography className="text-gray-600" style="body2">
        {`Version history of ${article.title}`}
      </Typography>
      <div className="my-2">
        <Card isCurrentVersion article={article} className="p-2" />
      </div>
      <div
        className="overflow-y-scroll"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {versions.map(version => (
          <div className="mb-2" key={version.id}>
            <Card handleClick={handleClick} version={version} />
          </div>
        ))}
      </div>
      {showVersionModal && (
        <Modal
          articleId={id}
          categories={categories}
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
