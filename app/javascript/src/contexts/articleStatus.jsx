import React, { createContext, useContext, useState } from "react";

const ArticleStatusStateContext = createContext();
const ArticleStatusDispatchContext = createContext();
const ArticleStatusProvider = ({ children }) => {
  const [initialState, setInitialState] = useState({
    status: "",
  });

  return (
    <ArticleStatusStateContext.Provider value={initialState}>
      <ArticleStatusDispatchContext.Provider value={setInitialState}>
        {children}
      </ArticleStatusDispatchContext.Provider>
    </ArticleStatusStateContext.Provider>
  );
};

const useArticleStatusState = () => {
  const context = useContext(ArticleStatusStateContext);
  if (context === undefined) {
    throw new Error(
      "useArticleStatusState must be used within a ArticleStatusProvider"
    );
  }

  return context;
};

const useArticleStatusDispatchContext = () => {
  const context = useContext(ArticleStatusDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useArticleStatusDispatchContext must be used within a ArticleStatusProvider"
    );
  }

  return context;
};

const useArticleStatus = () => [
  useArticleStatusState(),
  useArticleStatusDispatchContext(),
];

export {
  ArticleStatusProvider,
  useArticleStatusState,
  useArticleStatusDispatchContext,
  useArticleStatus,
};
