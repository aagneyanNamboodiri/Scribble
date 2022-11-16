import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Select } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import articlesApi from "apis/Api/articles";

import Card from "./Card";

import { INFO_STRING } from "../constants";
import { buildCategoryList } from "../utils";

const ArticleListing = ({ selectedCategory, categories }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [showInfo, setShowInfo] = useState(localStorage.getItem("info"));

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.articles_of_category(selectedCategory.id);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async ({ id, position }) => {
    try {
      await articlesApi.reorder({ id, position });
    } catch (err) {
      logger.log(err);
    }
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    handleReorder({
      id: result.draggableId,
      position: result.destination.index + 1,
    });
    const items = Array.from(articles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setArticles(items);
  };

  const handleHideInfo = () => {
    localStorage.setItem("info", "false");
    setShowInfo("false");
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

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
        {showInfo === null && (
          <Typography className="rounded bg-indigo-100 p-2" style="body3">
            {INFO_STRING}
            <span className="cursor-pointer underline" onClick={handleHideInfo}>
              Dont show this info again
            </span>
          </Typography>
        )}
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
