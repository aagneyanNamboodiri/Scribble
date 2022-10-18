import ArticleForm from "./Dashboard/ArticlesForm";
import Main from "./Dashboard/Main";
import Categories from "./Settings/Categories";
import General from "./Settings/General";
import Redirections from "./Settings/Redirections";

export const DASHBOARD_PATH = "/articles";
export const CREATE_ARTICLE = "/articles/create";
export const EDIT_ARTICLE = "/articles/:slug/edit";
export const SETTINGS_PATH = "/settings";
export const GENERAL_SETTINGS = "/settings/general";
export const CATEGORIES_SETTINGS = "/settings/categories";
export const REDIRECTIONS_SETTINGS = "/settings/redirections";

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
    path: GENERAL_SETTINGS,
    component: General,
  },
  {
    path: CATEGORIES_SETTINGS,
    component: Categories,
  },
  {
    path: REDIRECTIONS_SETTINGS,
    component: Redirections,
  },
];
