import { articlesAPI } from "../API/API";

const UPDATE_ARTICLES = "UPDATE_ARTICELS";
const SET_ARTICLES_COUNT = "SET_ARTICLES_COUNT";

let initialState = {
	articles: [],
	count: 0,
};

const articlesReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_ARTICLES: {
			return {
				...state,
				articles: [...action.articles],
			};
		}
		case SET_ARTICLES_COUNT: {
			return {
				...state,
				count: action.count,
			};
		}
		default:
			return state;
	}
};

export const updateArticles = (articles) => ({ type: UPDATE_ARTICLES, articles });
export const setArticlesCount = (count) => ({ type: SET_ARTICLES_COUNT, count });

export const getArticlesThunk = (page) => async (dispatch) => {
	const data = await articlesAPI.getArticles(page);
	dispatch(updateArticles(data.articles));
	dispatch(setArticlesCount(data.articlesCount));
};

export default articlesReducer;
