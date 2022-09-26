import React from "react";

import { logger } from "@rails/actioncable";
import { Formik, Form } from "formik";
import { Button } from "neetoui";
import { Input, Textarea } from "neetoui/formik";

import articlesApi from "apis/articles";

const ArticleForm = () => {
  const handleSubmit = async values => {
    try {
      await articlesApi.create(values);
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        body: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className="space-y-2">
        <Input className="w-full" label="Title" name="title" />
        <Textarea label="Body" name="body" />
        <Button label="Submit" type="submit" />
      </Form>
    </Formik>
  );
};

export default ArticleForm;
