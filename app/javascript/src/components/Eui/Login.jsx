import React, { useState } from "react";

import { Input, Button } from "neetoui";

import loginApi from "apis/login";

const Login = () => {
  const [password, setPassword] = useState([]);
  const handleSubmit = async () => {
    try {
      loginApi.create({ password });
    } catch (err) {
      logger.log(err);
    }
  };

  return (
    <div className="w-full flex-col justify-center">
      <Input
        placeholder="enter pwd"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default Login;
