import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

import { INITIAL_ARTICLES_FORM_VALUES } from "./constants";
import {
  buildArticlesFormValidationSchema,
  buildInitialValuesForEditArticle,
} from "./utils";

import TooltipWrapper from "../../TooltipWrapper";

const Form = ({ id, isEdit, articleData, categories }) => {
  const [status, setStatus] = useState(articleData?.status);
  const [noChangesMade, setNoChangesMade] = useState(true);

  const history = useHistory();
  const statusList = ["Save Draft", "Publish"];

  const handleSubmit = async values => {
    try {
      const modifiedValues = await {
        ...values,
        assigned_category_id: values.category.value,
        status,
        is_restoration: false,
      };
      isEdit
        ? await articlesApi.update({
            id,
            payload: { ...modifiedValues },
          })
        : await articlesApi.create(modifiedValues);
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
      {({ isSubmitting, handleSubmit, isValid, dirty }) => (
        <FormikForm className="mx-12 w-2/3 space-y-4 p-20 px-20">
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
          <div className="mr-4 flex space-x-2">
            <TooltipWrapper
              disabled={!(isValid && dirty) && noChangesMade}
              position="bottom"
              content={
                isEdit
                  ? "Please edit article to save"
                  : "Please type in all the fields to add article"
              }
            >
              <ActionDropdown
                label={status === "published" ? "Publish" : "Save Draft"}
                loading={isSubmitting}
                type="submit"
                buttonProps={{
                  disabled: !(isValid && dirty) && noChangesMade,
                }}
                onClick={handleSubmit}
              >
                <ul>
                  {statusList.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        if (
                          (item === "Save Draft" &&
                            articleData.status === "published") ||
                          (item === "Publish" && articleData.status === "draft")
                        ) {
                          setNoChangesMade(false);
                        } else {
                          setNoChangesMade(true);
                        }
                        item === "Save Draft"
                          ? setStatus("draft")
                          : setStatus("published");
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </ActionDropdown>
            </TooltipWrapper>
            <Button
              label="Cancel"
              size="large"
              style="text"
              type="reset"
              onClick={() => history.push("/articles")}
            />
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
