import React from "react";

import { Accordion, Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { useParams } from "react-router";

const Sidebar = ({ categories, articles }) => {
  const { slug } = useParams(slug);

  const findCurrentCategoryIndex = () => {
    const categoryName = articles.filter(article => article.slug === slug)[0]
      ?.category_name;

    return (
      categories.filter(category => category.name === categoryName)[0]
        ?.position - 1
    );
  };

  const currentArticleId = articles.filter(article => article.slug === slug)[0]
    ?.id;

  return (
    <div className="flex">
      <MenuBar showMenu>
        <Accordion defaultActiveKey={findCurrentCategoryIndex}>
          {categories.map(c => (
            <Accordion.Item key={c.id} title={c.name}>
              {articles
                .filter(article => article.category_name === c.name)
                .map(article => (
                  <div className="p-1" key={article.id}>
                    <Button
                      key={article.id}
                      label={article.title}
                      style="link"
                      to={`/public/${article.slug}`}
                      className={
                        article.id !== currentArticleId ? "text-black" : ""
                      }
                    />
                  </div>
                ))}
            </Accordion.Item>
          ))}
        </Accordion>
      </MenuBar>
    </div>
  );
};

export default Sidebar;
