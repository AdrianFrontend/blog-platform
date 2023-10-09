import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import articlesReducer from "./articles-reducer";

let reducers = combineReducers({
	articles: articlesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;
