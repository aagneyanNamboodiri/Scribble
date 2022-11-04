import { useState, useEffect } from "react";

import * as yup from "yup";

export const INITIAL_VALUES = {
  password: "",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  password: yup.string().required("Password is required"),
});

export const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
};
