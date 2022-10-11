import React from "react";

import { Accordion } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useHistory } from "react-router";

const Sidebar = () => {
  const history = useHistory();

  return (
    <div className="flex">
      <MenuBar showMenu>
        <Accordion defaultActiveKey={0}>
          <Accordion.Item title="Category 1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
          <Accordion.Item title="Category 2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Item>
          <Accordion.Item title="Category 3">
            <ul>
              <button onClick={() => history.push("/articles")}>
                Article 1
              </button>
              <li>Article 2</li>
              <li>Article 3</li>
            </ul>
          </Accordion.Item>
        </Accordion>
      </MenuBar>
    </div>
  );
};

export default Sidebar;
