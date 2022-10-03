import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Button, ActionDropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

const ArticleForm = ({ categories }) => {
  const history = useHistory();
  const { Menu, MenuItem } = ActionDropdown;
  const statusList = ["Save Draft", "Publish"];
  const [status, setStatus] = useState("draft");
  const handleSubmit = async values => {
    try {
      const modifiedValues = await {
        ...values,
        assigned_category_id: values.category.value,
      };
      await articlesApi.create(modifiedValues);
      history.push("/dashboard");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  const categoryList = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Formik
      initialValues={{
        title: "",
        body: "",
        category: "",
        status: "draft",
      }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form className="mt-2 w-full space-y-4">
          <div className="flex w-full space-x-2">
            <Input
              className="w-2/3 flex-grow-0"
              label="Article Title"
              name="title"
              placeholder="Title of your article"
              type="text"
            />
            <Select
              isClearable
              isSearchable
              className="w-1/3 flex-grow-0"
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
            // onChange={e => setBody(e.target.value)}
          />
          <div className="flex items-start">
            <div className="mr-4">
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
            </div>
            <div>
              <Button
                className="grow-0"
                label="Cancel"
                size="large"
                style="text"
                type="reset"
                onClick={() => history.push("/dashboard")}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
