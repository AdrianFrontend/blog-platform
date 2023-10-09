import { connect } from "react-redux";
import { getArticlesThunk } from "../../redux/articles-reducer";
import ArticlesList from "./ArticlesList";

const mstp = (state) => ({
	articles: state.articles.articles,
	count: state.articles.count,
});

export default connect(mstp, { getArticlesThunk })(ArticlesList);
