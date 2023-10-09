import Markdown from "react-markdown";
import s from "./Article.module.css";
import emptyHeartIcon from "../../img/empty-heart.svg";
import avatarPlaceHolder from "../../img/avatar-placeholder.png";
import { Link, Navigate, redirect, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { articlesAPI } from "../../API/API";
import heartIcon from "../../img/red-heart.svg";
import { format, parseISO } from "date-fns";
import { Button, Popconfirm } from "antd";
import EditArticle from "../EditArticle/EditArticle";
import preloader from "../../img/preloader.svg";

const Article = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [data, setData] = useState({
		title: "",
		favorited: "",
		favoritesCount: "",
		tagList: "",
		description: "",
		username: "",
		updatedAt: "",
		image: "",
		body: "",
		slug: "",
	});
	const [editMode, setEditMode] = useState(false);

	const location = useLocation().pathname;

	useEffect(() => {
		articlesAPI.getArticle(location).then((r) => {
			setData({
				title: r.title,
				favorited: r.favorited,
				favoritesCount: r.favoritesCount,
				tagList: r.tagList,
				description: r.description,
				username: r.author.username,
				updatedAt: r.updatedAt,
				image: r.author.image,
				body: r.body,
				slug: r.slug,
			});
			setIsLoaded(true);
		});
	}, []);

	const cutText = (text, maxLength) => {
		if (maxLength > text.length) {
			return text;
		}

		let lastSpace = text.slice(0, maxLength).lastIndexOf("");
		return text.slice(0, lastSpace) + "...";
	};

	const like = () => {
		if (data.favorited) {
			articlesAPI.unlike(data.slug);
			setData({
				...data,
				favoritesCount: data.favoritesCount - 1,
				favorited: false,
			});
		} else {
			articlesAPI.like(data.slug);
			setData({
				...data,
				favoritesCount: data.favoritesCount + 1,
				favorited: true,
			});
		}
	};

	const deleteConfirm = () => {
		articlesAPI.deleteArticle(data.slug);
	};

	if (!isLoaded) {
		return <img src={preloader} className={s.preloader}></img>;
	}

	let maxId = 0;
	if (editMode) {
		return (
			<EditArticle
				currentTitle={data.title}
				currentDescription={data.description}
				currentText={data.body}
				currentTags={
					data.tags
						? data.tags.map((item) => {
								return {
									id: maxId++,
									value: item,
								};
						  })
						: []
				}
				locationPath={location}
				setEditMode={setEditMode}
			/>
		);
	}

	return (
		<div className={s.Article}>
			<span className={s.title}>{data.title}</span>
			<span className={s.likes}>
				<button disabled={!localStorage.getItem("isAuth")} onClick={like}>
					{data.favorited ? (
						<img src={heartIcon} className={s.likesIcon} />
					) : (
						<img src={emptyHeartIcon} className={s.likesIcon} />
					)}
				</button>
				{data.favoritesCount}
			</span>
			<div className={s.tags}>
				{data.tagList.map((item) =>
					item ? (
						<span key={item + Math.random() * Math.random()} className={s.tag}>
							{cutText(item, 20)}
						</span>
					) : null
				)}
			</div>
			<div className={s.description}>{data.description ? cutText(data.description, 300) : null}</div>
			{localStorage.getItem("isAuth") && localStorage.getItem("username") === data.username ? (
				<div className={s.controlButtons}>
					<Button className={s.deleteButton}>
						<Popconfirm
							className={s.Popconfirm}
							title={"Are you sure to delete this article?"}
							cancelText={"No"}
							okText={"Yes"}
							placement="right"
							onConfirm={deleteConfirm}
						>
							Delete
						</Popconfirm>
					</Button>
					<Button className={s.editButton} onClick={() => setEditMode(true)}>
						Edit
					</Button>
				</div>
			) : null}
			<div className={s.author}>
				<span className={s.authorName}>{data.username ? cutText(data.username, 30) : null}</span>
				<span className={s.publishDate}>{format(parseISO(data.updatedAt), "MMMM d, y")}</span>
				<img src={data.image ? data.image : avatarPlaceHolder} className={s.authorAvatar}></img>
			</div>
			<div className={s.markdownContent}>
				<Markdown>{data.body}</Markdown>
			</div>
		</div>
	);
};

export default Article;
