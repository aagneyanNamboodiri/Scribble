import React, { useState } from "react";

import { Clock } from "neetoicons";
import { Checkbox, Typography, Tag } from "neetoui";
import TooltipWrapper from "tooltipwrapper";

import {
  daysFromNowFormat,
  formatTime,
  getArticleStatusString,
} from "../utils";

const Card = ({ article, provided, selectedArticles, setSelectedArticles }) => {
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(prev => !prev);
    const indexOfArticle = selectedArticles?.indexOf(article.id);
    if (indexOfArticle === -1) {
      setSelectedArticles(prev => [...prev, article.id]);
    } else {
      setSelectedArticles(prev =>
        prev.filter(prevArticleId => prevArticleId !== article.id)
      );
    }
  };

  return (
    <div
      className="border m-3 w-full space-y-2 p-4 hover:shadow-md"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Checkbox checked={checked} onChange={handleChecked} />
      <div className="flex justify-between">
        <Typography style="h3" weight="medium">
          {article.title}
        </Typography>
      </div>
      <div
        className="text-gray-600"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {article.body}
      </div>
      <hr />
      <div className="flex justify-end space-x-2 pt-1">
        <Clock size={18} />
        <TooltipWrapper
          disabled
          content={formatTime(article.updated_at)}
          followCursor="horizontal"
          position="bottom"
        >
          <Typography className="pr-2 text-gray-500" style="body3">
            {`${getArticleStatusString(article.status)} ${daysFromNowFormat(
              article.updated_at
            )}`}
          </Typography>
        </TooltipWrapper>
        <Tag
          className="bg-gray-100"
          label={getArticleStatusString(article.status)}
          style={article.status === "published" ? "success" : "warning"}
          type="solid"
        />
      </div>
    </div>
  );
};

export default Card;
