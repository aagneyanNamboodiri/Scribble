import React from "react";

import { ExternalLink, Download } from "neetoicons";
import { Button } from "neetoui";

import { useArticleStatusState } from "contexts/articleStatus";

import ArticleStatusTag from "./ArticleStatusTag";
import NavItem from "./NavItem";

const Navbar = () => {
  const { status } = useArticleStatusState();

  return (
    <div className="border-b flex justify-between p-5">
      <div className="flex">
        <div className="pl-4">
          <NavItem iconClass="ri-add-fill " name="Scribble" path="/articles" />
          <NavItem iconClass="ri-add-fill " name="Articles" path="/articles" />
          <NavItem
            iconClass="ri-file-download-fill"
            name="Settings"
            path="/settings"
          />
          <NavItem
            iconClass="ri-add-fill "
            name="Analytics"
            path="/analytics"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        {status && <ArticleStatusTag status={status} />}
        <Button
          icon={() => <Download size={17} />}
          iconPosition="left"
          label="Download report"
          to="/download"
        />
        <Button
          icon={() => <ExternalLink size={17} />}
          label="Preview"
          style="secondary"
          onClick={() => window.open("/public", "_blank")}
        />
      </div>
    </div>
  );
};
export default Navbar;
