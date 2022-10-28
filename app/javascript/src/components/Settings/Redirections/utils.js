export const buildInitialValues = redirection => ({
  from_path: redirection.from_path,
  to_path: redirection.to_path,
});

export const truncateLongString = str =>
  str.length > 25 ? `${str.substring(0, 25)}...` : str;
