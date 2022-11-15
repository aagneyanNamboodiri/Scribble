import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Select } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/Api/categories";

import Card from "./Card";

import { buildCategoryList } from "../utils";

const ArticleListing = ({ selectedCategory, categories }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setArticles(items);
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await categoriesApi.show_articles(selectedCategory.id);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [selectedCategory]);

  const handleHideInfo = () => {};

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="space-y-2">
        <div className="flex justify-between px-2 pt-1">
          <Typography style="h2" weight="medium">
            Manage Articles
          </Typography>
          <div>
            <Select
              isSearchable
              options={buildCategoryList(categories)}
              placeholder="Move to"
            />
          </div>
        </div>
        <Typography className="rounded bg-indigo-100 p-2" style="body3">
          You can reorder articles or categories by dragging and dropping here.
          You can also multiselect articles and move them to another category.{" "}
          <span className="cursor-pointer underline" onClick={handleHideInfo}>
            Dont show this info again
          </span>
        </Typography>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="articles">
          {provided => (
            <ul
              className="articles"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {articles.map((article, index) => (
                <Draggable
                  draggableId={article.id.toString()}
                  index={index}
                  key={article.id}
                >
                  {provided => <Card article={article} provided={provided} />}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ArticleListing;
