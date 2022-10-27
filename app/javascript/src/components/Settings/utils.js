import { SETTINGS_ROUTES } from "../routeConstants";

export const getActiveNavLink = key =>
  SETTINGS_ROUTES.find(navlink => key === navlink.key);
