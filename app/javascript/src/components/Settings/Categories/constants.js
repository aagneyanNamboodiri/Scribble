import * as yup from "yup";

export const buildInitialValue = category => {
  const initialValue = {
    name: Object.keys(category).length === 0 ? "" : category.name,
  };

  return initialValue;
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});

export const buildCategoryValues = (categories, deletedCategory) =>
  categories
    .map(category => ({
      value: category.id,
      label: category.name,
    }))
    .filter(category => category.value !== deletedCategory);

export const DELETE_MODAL_CATEGORY_SELECT_INITIAL_VALUES = {
  category: "",
};
