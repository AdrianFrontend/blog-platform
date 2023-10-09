import s from "./ArticlesListItem.module.css";
import emptyHeartIcon from "../../../img/empty-heart.svg";
import heartIcon from "../../../img/red-heart.svg";
import avatarPlaceHolder from "../../../img/avatar-placeholder.png";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import { articlesAPI } from "../../../API/API";
import { useState } from "react";

const ArticlesListItem = ({
	title,
	favorited,
	favoritesCount,
	tagList,
	description,
	username,
	updatedAt,
	image,
	slug,
}) => {
	const [favoritedLocal, setFavoritedLocal] = useState(favorited);
	const [favoritesCountLocal, setFavoritesCountLocal] = useState(favoritesCount);

	const cutText = (text, maxLength) => {
		if (maxLength > text.length) {
			return text;
		}

		let lastSpace = text.slice(0, maxLength).lastIndexOf("");
		return text.slice(0, lastSpace) + "...";
	};

	function like() {
		articlesAPI.like(slug);
		setFavoritedLocal(!favoritedLocal);
		if (favoritedLocal) {
			setFavoritesCountLocal(favoritesCountLocal - 1);
		} else {
			setFavoritesCountLocal(favoritesCountLocal + 1);
		}
	}

	return (
		<li className={s.ArticlesListItem}>
			<Link to={`/articles/${slug}`} className={s.title}>
				{title ? cutText(title, 30) : null}
			</Link>
			<span className={s.likes}>
				<button disabled={!localStorage.getItem("isAuth")} onClick={like}>
					{favoritedLocal ? (
						<img src={heartIcon} className={s.likesIcon} />
					) : (
						<img src={emptyHeartIcon} className={s.likesIcon} />
					)}
				</button>
				{favoritesCountLocal}
			</span>
			<div className={s.tags}>
				{tagList.map((item) =>
					item ? (
						<span key={item + Math.random() * Math.random()} className={s.tag}>
							{cutText(item, 20)}
						</span>
					) : null
				)}
			</div>
			<div className={s.description}>{description ? cutText(description, 300) : null}</div>
			<div className={s.author}>
				<span className={s.authorName}>{username ? cutText(username, 30) : null}</span>
				<span className={s.publishDate}>{format(parseISO(updatedAt), "MMMM d, y")}</span>
				<img src={image ? image : avatarPlaceHolder} className={s.authorAvatar}></img>
			</div>
		</li>
	);
};

ArticlesListItem.propTypes = {
	title: PropTypes.string,
	favorited: PropTypes.bool,
	favoritesCount: PropTypes.number,
	tagList: PropTypes.array,
	description: PropTypes.string,
	username: PropTypes.string,
	updatedAt: PropTypes.string,
	image: PropTypes.string,
	slug: PropTypes.string,
};

export default ArticlesListItem;
