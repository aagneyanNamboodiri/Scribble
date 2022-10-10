import React, { useState, useEffect } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader } from "neetoui";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import Card from "./Card";
import Create from "./Form";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

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
    setLoading(true);
    try {
      await categoriesApi.reorder(id, { positions });
    } catch (err) {
      logger.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
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
    <div className="flex w-full justify-center py-4">
      <div className="w-1/2 flex-col">
        <div className="space-y-10">
          <div className="flex-col space-y-2">
            <Typography style="h2" weight="medium">
              Manage Categories
            </Typography>
            <Typography className="text-gray-600" style="body2">
              Create and configure categories inside your scribble
            </Typography>
          </div>
          <div className="w-full flex-col space-y-1">
            <div className=" flex w-full justify-between py-3">
              <div className="flex space-x-2">
                {isCreating ? (
                  <Create
                    refetch={fetchCategories}
                    setIsCreatingOrEditing={setIsCreating}
                  />
                ) : (
                  <>
                    <Plus
                      color="#3182ce"
                      size="20"
                      onClick={() => setIsCreating(true)}
                    />
                    <Typography className="text-blue-600" style="body2">
                      Add new category
                    </Typography>
                  </>
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
      </div>
    </div>
  );
};
export default Categories;
