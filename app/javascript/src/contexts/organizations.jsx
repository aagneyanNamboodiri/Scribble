import React, { createContext, useContext, useEffect, useState } from "react";

import organizationsApi from "apis/Api/organizations";

const OrganizationStateContext = createContext();
const OrganizationDispatchContext = createContext();
const OrganizationProvider = ({ children }) => {
  const [initialState, setInitialState] = useState({
    siteName: "",
    isPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const { data } = await organizationsApi.show();
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
    fetchOrganizations();
  }, []);
  if (loading) {
    return <div />;
  }

  return (
    <OrganizationStateContext.Provider value={initialState}>
      <OrganizationDispatchContext.Provider value={setInitialState}>
        {children}
      </OrganizationDispatchContext.Provider>
    </OrganizationStateContext.Provider>
  );
};

const useOrganizationState = () => {
  const context = useContext(OrganizationStateContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizationState must be used within a OrganizationProvider"
    );
  }

  return context;
};

const useOrganizationDispatch = () => {
  const context = useContext(OrganizationDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizationDispatch must be used within a OrganizationProvider"
    );
  }

  return context;
};

const useOrganization = () => [
  useOrganizationState(),
  useOrganizationDispatch(),
];

export {
  OrganizationProvider,
  useOrganizationState,
  useOrganizationDispatch,
  useOrganization,
};
