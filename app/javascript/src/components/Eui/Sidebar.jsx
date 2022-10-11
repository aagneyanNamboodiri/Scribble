import React from "react";

import { Accordion, Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";

const Sidebar = ({ categories, articles }) => (
  <div className="flex">
    <MenuBar showMenu>
      <Accordion defaultActiveKey={0}>
        {categories.map(c => (
          <Accordion.Item key={c.id} title={c.name}>
            {articles
              .filter(article => article.category_name === c.name)
              .map(article => (
                <div className="p-2" key={article.id}>
                  <Button key={article.id} label={article.title} style="link" />
                </div>
              ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </MenuBar>
  </div>
);

export default Sidebar;
