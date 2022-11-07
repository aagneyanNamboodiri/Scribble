import React from "react";

import { Typography, Callout, Button } from "neetoui";

import { formatTime, getButtonLabel } from "../utils";

const Card = ({ article, isCurrentVersion, version, handleClick }) =>
  isCurrentVersion ? (
    <Callout style="success">
      <div className="flex space-x-10 p-1">
        <div>
          <Typography className="text-gray-600" style="body2">
            {formatTime(article.updated_at)}
          </Typography>
          <Typography className="text-gray-600" component="i" style="body2">
            Current version
          </Typography>
        </div>
        <Typography
          className="pt-3"
          component="strong"
          style="body2"
        >{`Article ${
          article.status === "published" ? "published" : "drafted"
        }`}</Typography>
      </div>
    </Callout>
  ) : (
    <Callout>
      <div className="flex space-x-10 p-1" key={version.id}>
        <div className="pt-1">
          <Typography className="text-gray-600" style="body2">
            {formatTime(version.time)}
          </Typography>
          {version.restoration_date && (
            <Typography className="text-gray-600" component="i" style="body3">
              Restored from {formatTime(version.restoration_date)}
            </Typography>
          )}
        </div>
        <Button
          className="text-indigo-500"
          label={getButtonLabel(version)}
          style="link"
          onClick={() => handleClick(version.id)}
        />
      </div>
    </Callout>
  );

export default Card;
