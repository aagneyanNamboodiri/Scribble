import React, { createContext, useContext, useEffect, useState } from "react";

import preferencesApi from "apis/preferences";

const PreferenceStateContext = createContext();
const PreferenceDispatchContext = createContext();
const PreferenceProvider = ({ children }) => {
  const [initialState, setInitialState] = useState({
    siteName: "",
    isPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data } = await preferencesApi.list();
      setInitialState({
        siteName: data.site_name,
        isPassword: data.is_password,
      });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPreferences();
  }, []);
  if (loading) {
    return <div />;
  }

  return (
    <PreferenceStateContext.Provider value={initialState}>
      <PreferenceDispatchContext.Provider value={setInitialState}>
        {children}
      </PreferenceDispatchContext.Provider>
    </PreferenceStateContext.Provider>
  );
};

const usePreferenceState = () => {
  const context = useContext(PreferenceStateContext);
  if (context === undefined) {
    throw new Error(
      "usePreferenceState must be used within a PreferenceProvider"
    );
  }

  return context;
};

const usePreferenceDispatch = () => {
  const context = useContext(PreferenceDispatchContext);
  if (context === undefined) {
    throw new Error(
      "usePreferenceDispatch must be used within a PreferenceProvider"
    );
  }

  return context;
};

const usePreference = () => [usePreferenceState(), usePreferenceDispatch()];

export {
  PreferenceProvider,
  usePreferenceState,
  usePreferenceDispatch,
  usePreference,
};
