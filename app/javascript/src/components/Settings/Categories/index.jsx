import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/Api/categories";

import ArticleListing from "./ArticleListing";
import Card from "./Card";
import Form from "./Form";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleOnDragEnd = result => {
    if (!result.destination) return;
    handleReorder(
      result.draggableId,
      result.source.index - result.destination.index
    );
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  };

  const handleReorder = async (id, positions) => {
    try {
      await categoriesApi.reorder(id, { positions });
    } catch (err) {
      logger.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      setSelectedCategory(categories[0]);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full px-4">
      <div className="border-r w-1/3 flex-col p-2">
        <div className="flex justify-between px-2 pt-1">
          <Typography style="h2" weight="medium">
            Manage Categories
          </Typography>
          <Button
            icon={() => <Plus size={16} />}
            size="small"
            onClick={() => setIsCreating(true)}
          />
        </div>
        <div className="w-full flex-col space-y-1">
          <div className=" flex w-full justify-between py-3">
            <div className="flex space-x-2">
              {isCreating && (
                <Form
                  isEditing={!isCreating}
                  refetch={fetchCategories}
                  setAction={setIsCreating}
                />
              )}
            </div>
          </div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="categories">
              {provided => (
                <ul
                  className="categories"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {categories.map((category, index) => (
                    <Draggable
                      draggableId={category.id.toString()}
                      index={index}
                      key={category.id}
                    >
                      {provided => (
                        <Card
                          category={category}
                          categoryList={categories}
                          key={category.id}
                          provided={provided}
                          refetch={fetchCategories}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="w-2/3">
        <ArticleListing
          categories={categories}
          fetchCategories={fetchCategories}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};
export default Categories;
