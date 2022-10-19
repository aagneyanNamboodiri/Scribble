import React from "react";

import { Formik, Form } from "formik";
import { CloseCircle } from "neetoicons";
import { Modal, Typography, Button } from "neetoui";
import { Select, Button as FormikButton } from "neetoui/formik";

import categoriesApi from "apis/categories";

import {
  buildCategoryValues,
  DELETE_MODAL_CATEGORY_SELECT_INITIAL_VALUES,
} from "./constants";
import { buildDeleteModalSelectValidationSchema } from "./utils";

const DeleteModal = ({ refetch, onClose, category, categoryList }) => {
  const handleDelete = async values => {
    try {
      await categoriesApi.destroy(category.id, values?.category?.value);
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };
  if (categoryList.length < 2 || category.articles_count < 1) {
    return (
      <Modal isOpen onClose={onClose}>
        <Modal.Header>
          <Typography id="dialog1Title" style="h2">
            Delete Category
          </Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Typography lineHeight="normal" style="body1">
            You are permanently deleting the{" "}
            <span className="font-bold">{category.name}</span> category. This
            action cannot be undone. Are you sure you want to continue?
          </Typography>
          {category.articles_count > 0 && (
            <div className="flex items-center space-x-2 border-2 border-solid border-red-600 bg-red-100 p-3">
              <CloseCircle
                className="w-1/3 content-center"
                color="#e53e3e"
                size={30}
              />
              <Typography lineHeight="normal" style="body1">
                {`This category has ${category.articles_count} ${
                  category.articles_count > 1 ? "articles" : "article"
                } under it. Before this category is deleted, these
                articles need to be moved to another category.`}
                These articles will be moved to a new category called
                <span className="font-bold"> General</span>
              </Typography>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button label="Continue" onClick={() => handleDelete()} />
          <Button label="Cancel" style="text" onClick={onClose} />
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Formik
      initialValues={DELETE_MODAL_CATEGORY_SELECT_INITIAL_VALUES}
      validationSchema={buildDeleteModalSelectValidationSchema(categoryList)}
      onSubmit={handleDelete}
    >
      <Form>
        <Modal isOpen onClose={onClose}>
          <Modal.Header>
            <Typography id="dialog1Title" style="h2">
              Delete Category
            </Typography>
          </Modal.Header>
          <Modal.Body className="space-y-2">
            <Typography lineHeight="normal" style="body1">
              You are permanently deleting the{" "}
              <span className="font-bold">{category.name}</span> category. This
              action cannot be undone. Are you sure you want to continue?
            </Typography>
            {category.articles_count > 0 && (
              <>
                <div className="flex items-center space-x-2 border-2 border-solid border-red-600 bg-red-100 p-3">
                  <CloseCircle
                    className="w-1/3 content-center"
                    color="#e53e3e"
                    size={30}
                  />
                  <Typography lineHeight="normal" style="body1">
                    {`This category has ${category.articles_count} ${
                      category.articles_count > 1 ? "articles" : "article"
                    } under it. Before this category is deleted, these
                articles need to be moved to another category.`}
                    {categoryList.length === 1 && (
                      <Typography>
                        These articles will be moved to a new category called
                        <span className="font-bold"> General</span>
                      </Typography>
                    )}
                  </Typography>
                </div>
                {categoryList.length > 1 && (
                  <Select
                    isClearable
                    isSearchable
                    label="Select a category to move these articles to*"
                    name="category"
                    options={buildCategoryValues(categoryList, category.id)}
                  />
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="space-x-2">
            <FormikButton label="Continue" type="submit" />
            <FormikButton label="Cancel" style="text" onClick={onClose} />
          </Modal.Footer>
        </Modal>
      </Form>
    </Formik>
  );
};

export default DeleteModal;
