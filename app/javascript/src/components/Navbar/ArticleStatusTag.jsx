import React from "react";

import { Tag } from "neetoui";

const ArticleStatusTag = ({ status }) =>
  status === "published" ? (
    <Tag
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      size="large"
      style="success"
      type="outline"
    />
  ) : (
    <Tag
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      size="large"
      style="warning"
      type="outline"
    />
  );

export default ArticleStatusTag;
