import React, { useState } from "react";

import { Plus, Search } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import CategoryCreate from "./CategoryCreate";

const SideMenu = ({
  articles,
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

  const handleCategoryFiltering = categoryName => {
    const indexOfCategory = selectedCategoryFilter?.indexOf(categoryName);
    setIsSearchCollapsed(true);
    setCategorySearch("");
    if (indexOfCategory === -1) {
      setSelectedCategoryFilter(prev => [...prev, categoryName]);
    } else {
      setSelectedCategoryFilter(prev =>
        prev.filter(prev_category => prev_category !== categoryName)
      );
    }
  };

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
            onClick: () => {
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed);
            },
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
            active={selectedCategoryFilter.includes(category.name)}
            count={category.articles_count || 0}
            key={category.id}
            label={category.name}
            onClick={() => handleCategoryFiltering(category.name)}
          />
        ))}
    </MenuBar>
  );
};

export default SideMenu;
