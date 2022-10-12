import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader } from "neetoui";

import redirectionsApi from "apis/redirections";

import Form from "./Form";
import Row from "./Row";

const Redirections = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [redirections, setRedirections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRedirections = async () => {
    try {
      setLoading(true);
      const {
        data: { redirections },
      } = await redirectionsApi.list();
      setRedirections(redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedirections();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center py-4">
      <div className="w-2/3 flex-col">
        <div className="space-y-10">
          <div className="flex-col space-y-2">
            <Typography style="h2" weight="medium">
              Redirections
            </Typography>
            <Typography className="text-gray-600" style="body2">
              Create and configure redirection rules to send users from old
              links to new links. All redirections are performed with 301 status
              codes to be SEO friendly.
            </Typography>
          </div>
        </div>
        <div className="w-full flex-col space-y-3 bg-indigo-100 p-5">
          <div className="flex justify-between">
            <Typography className="text-gray-600" style="body3" weight="medium">
              FROM PATH
            </Typography>
            <Typography className="text-gray-600" style="body3" weight="medium">
              TO PATH
            </Typography>
            <Typography className="text-gray-600" style="body3" weight="medium">
              ACTIONS
            </Typography>
          </div>
          {redirections.map(redirection => (
            <Row
              key={redirection.id}
              redirection={redirection}
              refetch={fetchRedirections}
            />
          ))}
          {isCreating && <Form setAction={setIsCreating} />}
          {!isCreating && (
            <div className="flex">
              <Plus
                color="#667eea"
                size="20"
                onClick={() => setIsCreating(true)}
              />
              <Typography className="text-indigo-500" style="body2">
                Add new redirection
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Redirections;
