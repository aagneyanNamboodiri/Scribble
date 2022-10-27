import ArticleForm from "./Dashboard/ArticlesForm";
import Main from "./Dashboard/Main";
import Categories from "./Settings/Categories";
import General from "./Settings/General";
import Redirections from "./Settings/Redirections";

export const DASHBOARD_PATH = "/articles";
export const CREATE_ARTICLE = "/articles/create";
export const EDIT_ARTICLE = "/articles/:id/edit";
export const SETTINGS_PATH = "/settings";
export const GENERAL_SETTINGS = "/settings?tab=general";
export const CATEGORIES_SETTINGS = "/settings?tab=categories";
export const REDIRECTIONS_SETTINGS = "/settings?tab=redirections";

export const DASHBOARD_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Main,
  },
  {
    path: CREATE_ARTICLE,
    component: ArticleForm,
  },
  {
    path: EDIT_ARTICLE,
    component: ArticleForm,
  },
];

export const SETTINGS_ROUTES = [
  {
    key: "general",
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    path: GENERAL_SETTINGS,
    component: General,
  },
  {
    key: "redirections",
    label: "Redirections",
    description: "Create & configure redirection rules",
    path: REDIRECTIONS_SETTINGS,
    component: Redirections,
  },
  {
    key: "categories",
    label: "Categories",
    description: "Edit and reorder KB structure",
    path: CATEGORIES_SETTINGS,
    component: Categories,
  },
];
