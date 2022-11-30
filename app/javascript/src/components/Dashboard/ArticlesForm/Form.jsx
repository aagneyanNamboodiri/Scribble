import React, { useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Button, ActionDropdown } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";
import { useHistory } from "react-router-dom";
import TooltipWrapper from "tooltipwrapper";

import articlesApi from "apis/Api/articles";

import Alert from "./Alert";
import { INITIAL_ARTICLES_FORM_VALUES } from "./constants";
import SchedulerModal from "./SchedulerModal";
import ScheduleIndicator from "./Schedules/ScheduleIndicator";
import {
  buildArticlesFormValidationSchema,
  buildInitialValuesForEditArticle,
  buildCategoryList,
  getArticleSchedulingStatus,
} from "./utils";

const Form = ({
  id,
  isEdit,
  articleData,
  categories,
  pendingSchedules,
  fetchSchedules,
}) => {
  const [status, setStatus] = useState(articleData?.status);
  const [noChangesMade, setNoChangesMade] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();
  const statusList = ["Save Draft", "Publish"];
  const categoryList = buildCategoryList(categories);

  const handleSubmit = values => {
    if (
      !(pendingSchedules === undefined) &&
      pendingSchedules[0]?.article_status === status
    ) {
      setShowAlert(true);
    } else {
      submitValues(values);
    }
  };

  const submitValues = async values => {
    try {
      const modifiedValues = await {
        ...values,
        assigned_category_id: values.category.value,
        status,
        restored_from: null,
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
      {({ isSubmitting, handleSubmit, isValid, dirty, ...props }) => (
        <FormikForm
          className={
            isEdit
              ? "mx-12 w-2/3 space-y-4 p-20 px-20"
              : "mx-24 space-y-4 p-20 px-56"
          }
        >
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
          <div className="flex-col space-y-6">
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
                  loading={isSubmitting}
                  type="submit"
                  buttonProps={{
                    disabled: !(isValid && dirty) && noChangesMade,
                  }}
                  label={
                    status === "published" ? "Publish Now" : "Save as Draft"
                  }
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
                            (item === "Publish" &&
                              articleData.status === "draft")
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
            {isEdit && (
              <div className="flex space-x-2">
                <Button
                  label={
                    getArticleSchedulingStatus({
                      pendingSchedules,
                      articleData,
                    }) === "published"
                      ? "Publish later"
                      : "Save to draft later"
                  }
                  onClick={() => setShowModal(true)}
                />
                {pendingSchedules.length > 0 && (
                  <ScheduleIndicator scheduleInfo={pendingSchedules[0]} />
                )}
                {showModal && (
                  <SchedulerModal
                    articleId={articleData.id}
                    fetchSchedules={fetchSchedules}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    statusToScheduleTo={getArticleSchedulingStatus({
                      pendingSchedules,
                      articleData,
                    })}
                  />
                )}
                {showAlert && (
                  <Alert
                    setShowAlert={setShowAlert}
                    showAlert={showAlert}
                    status={status}
                    submitValues={submitValues}
                    time={pendingSchedules[0].scheduled_time}
                    values={props.values}
                  />
                )}
              </div>
            )}
          </div>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
