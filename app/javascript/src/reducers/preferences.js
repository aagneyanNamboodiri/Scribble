const preferencesReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_PREFERENCES": {
      return {
        siteName: payload.siteName,
        password: payload.password,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default preferencesReducer;
