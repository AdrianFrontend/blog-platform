import { useEffect, useState } from "react";
import s from "./ArticlesList.module.css";
import ArticlesListItem from "./ArticlesListItem/ArticlesListItem";
import { Pagination } from "antd";
import PropTypes from "prop-types";
import preloader from "../../img/preloader.svg";

const ArticlesList = ({ articles, count, getArticlesThunk }) => {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getArticlesThunk(currentPage);
	}, [currentPage]);

	if (articles.length === 0) {
		return <img src={preloader} className={s.preloader}></img>;
	}

	const articlesItems = articles.map((item) => (
		<ArticlesListItem
			title={item.title}
			favorited={item.favorited}
			favoritesCount={item.favoritesCount}
			tagList={item.tagList}
			description={item.description}
			username={item.author.username}
			updatedAt={item.updatedAt}
			image={item.author.image}
			slug={item.slug}
			key={item.slug}
		/>
	));

	return (
		<div className={s.ArticlesListWrapper}>
			<ul className={s.ArticlesList}>{articlesItems}</ul>
			<Pagination
				defaultCurrent={1}
				pageSize={5}
				showSizeChanger={false}
				total={count}
				className={s.pagination}
				onChange={(value) => setCurrentPage(value)}
			/>
		</div>
	);
};

ArticlesList.propTypes = {
	articles: PropTypes.array,
	count: PropTypes.number,
	getArticlesThunk: PropTypes.func,
};

export default ArticlesList;
