import { Button, Input } from "antd";
import s from "./CreateArticle.module.css";
import { useState } from "react";
import { articlesAPI } from "../../API/API";
import ArticleForm from "../ArticleForm/ArticleForm";

const CreateArticle = () => {
	if (!localStorage.getItem("isAuth")) {
		location.replace("/login")
	} else {
		return <ArticleForm />
	}
};

export default CreateArticle;
