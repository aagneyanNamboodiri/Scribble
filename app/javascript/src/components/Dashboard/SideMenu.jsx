import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const SideMenu = ({ articles, categories }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block active count={articles.length} label="All" />
      <MenuBar.Block
        count={articles.filter(article => article.status === "draft").length}
        label="Drafts"
      />
      <MenuBar.Block
        label="Published"
        count={
          articles.filter(article => article.status === "published").length
        }
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
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {categories.map(category => (
        <MenuBar.Block
          count={category.articles_count || 0}
          key={category.id}
          label={category.name}
        />
      ))}
    </MenuBar>
  );
};

export default SideMenu;
