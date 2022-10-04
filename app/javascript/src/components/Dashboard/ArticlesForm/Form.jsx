import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, ActionDropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

import { INITIAL_ARTICLES_FORM_VALUES } from "./constants";
import {
  buildArticlesFormValidationSchema,
  buildInitialValuesForEditArticle,
} from "./utils";

const ArticleForm = ({ isEdit, articleData, categories }) => {
  const history = useHistory();
  const { Menu, MenuItem } = ActionDropdown;
  const statusList = ["Save Draft", "Publish"];
  const [status, setStatus] = useState("draft");
  const handleSubmit = async values => {
    try {
      const modifiedValues = await {
        ...values,
        assigned_category_id: values.category.value,
        status,
      };
      await articlesApi.create(modifiedValues);
      history.push("/articles");
    } catch (err) {
      logger.log(err);
    }
  };
  const categoryList = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Formik
      validationSchema={buildArticlesFormValidationSchema(categoryList)}
      initialValues={
        isEdit
          ? buildInitialValuesForEditArticle(articleData)
          : INITIAL_ARTICLES_FORM_VALUES
      }
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form className="mx-24 space-y-4 p-20 px-56">
          <div className="flex space-x-2">
            <Input
              label="Article Title"
              name="title"
              placeholder="Title of your artice"
              type="text"
            />
            <Select
              isClearable
              isSearchable
              label="Category"
              name="category"
              options={categoryList}
              placeholder="Select Category"
            />
          </div>
          <Textarea
            label="Article Body"
            name="body"
            placeholder="What do you wish to write"
            rows="15"
          />
          <div className="mr-4 space-x-2">
            <ActionDropdown
              disabled={isSubmitting}
              label={status === "draft" ? "Save Draft" : "Publish"}
              loading={isSubmitting}
              type="submit"
              onClick={handleSubmit}
            >
              <Menu>
                {statusList.map((item, idx) => (
                  <MenuItem.Button
                    key={idx}
                    onClick={() => {
                      item === "Save Draft"
                        ? setStatus("draft")
                        : setStatus("published");
                    }}
                  >
                    {item}
                  </MenuItem.Button>
                ))}
              </Menu>
            </ActionDropdown>
            <Button
              label="Cancel"
              size="large"
              style="text"
              type="reset"
              onClick={() => history.push("/articles")}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
