import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const SideMenu = ({
  articles,
  categories,
  setArticleCategory,
  articleCategory,
  setArticleStatus,
  articleStatus,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block
        active={articleStatus === "all"}
        count={articles.length}
        label="All"
        onClick={() => setArticleStatus("all")}
      />
      <MenuBar.Block
        active={articleStatus === "draft"}
        count={articles.filter(article => article.status === "draft").length}
        label="Drafts"
        onClick={() => setArticleStatus("draft")}
      />
      <MenuBar.Block
        active={articleStatus === "published"}
        label="Published"
        count={
          articles.filter(article => article.status === "published").length
        }
        onClick={() => setArticleStatus("published")}
      />
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
          },
          {
            icon: Plus,
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          Categories
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        value={categorySearch}
        onChange={e => setCategorySearch(e.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {categories
        .filter(category =>
          category.name.toLowerCase().includes(categorySearch.toLowerCase())
        )
        .map(category => (
          <MenuBar.Block
            active={articleCategory === category.name}
            count={category.articles_count || 0}
            key={category.id}
            label={category.name}
            onClick={() => setArticleCategory(category.name)}
          />
        ))}
    </MenuBar>
  );
};

export default SideMenu;
