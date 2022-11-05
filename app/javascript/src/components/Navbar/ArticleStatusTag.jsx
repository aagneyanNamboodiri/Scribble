import React from "react";

import { Tag } from "neetoui";

const ArticleStatusTag = ({ status }) => (
  <Tag
    label={status.charAt(0).toUpperCase() + status.slice(1)}
    size="large"
    style={status === "published" ? "success" : "warning"}
    type="outline"
  />
);

export default ArticleStatusTag;
