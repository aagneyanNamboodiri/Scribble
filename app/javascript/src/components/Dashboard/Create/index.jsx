import React from "react";

import ArticleForm from "./Form";

import Navbar from "../Navbar";

const Create = () => (
  <>
    <Navbar />
    <div className="flex justify-center">
      <ArticleForm />
    </div>
  </>
);

export default Create;
