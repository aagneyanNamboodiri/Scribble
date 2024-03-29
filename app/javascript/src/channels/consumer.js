// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer } from "@rails/actioncable";

const buildWebsocketURL = () => {
  const userId = localStorage.getItem("userId");

  return encodeURI(`/cable?user_id=${userId}`);
};

export default () => createConsumer(buildWebsocketURL());
