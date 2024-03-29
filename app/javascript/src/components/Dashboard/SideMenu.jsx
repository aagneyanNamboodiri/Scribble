import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { remove, append } from "ramda";

import CategoryCreate from "./CategoryCreate";

const SideMenu = ({
  articleStatusCounts,
  categories,
  setSelectedCategoryFilter,
  selectedCategoryFilter,
  setArticleStatus,
  articleStatus,
  refetch,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCategoryFiltering = categoryId => {
    const indexOfCategory = selectedCategoryFilter?.indexOf(categoryId);
    setIsSearchCollapsed(true);
    setCategorySearch("");
    if (indexOfCategory === -1) {
      setSelectedCategoryFilter(append(categoryId, selectedCategoryFilter));
    } else {
      setSelectedCategoryFilter(
        remove(indexOfCategory, 1, selectedCategoryFilter)
      );
    }
  };

  return (
    <MenuBar showMenu title="Articles">
      <MenuBar.Block
        active={articleStatus === "all"}
        count={articleStatusCounts.all}
        label="All"
        onClick={() => setArticleStatus("all")}
      />
      <MenuBar.Block
        active={articleStatus === "draft"}
        count={articleStatusCounts.draft}
        label="Drafts"
        onClick={() => setArticleStatus("draft")}
      />
      <MenuBar.Block
        active={articleStatus === "published"}
        count={articleStatusCounts.published}
        label="Published"
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
            onClick: () => setIsCreating(prev => !prev),
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
        onCollapse={() => {
          setIsSearchCollapsed(true);
          setCategorySearch("");
        }}
      />
      {isCreating && (
        <CategoryCreate refetch={refetch} setIsCreating={setIsCreating} />
      )}
      {categories
        .filter(category =>
          category.name.toLowerCase().includes(categorySearch.toLowerCase())
        )
        .map(category => (
          <MenuBar.Block
            active={selectedCategoryFilter.includes(category.id)}
            count={category.articles_count || 0}
            key={category.id}
            label={category.name}
            onClick={() => handleCategoryFiltering(category.id)}
          />
        ))}
    </MenuBar>
  );
};

export default SideMenu;
