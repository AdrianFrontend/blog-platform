import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PageHeader from "./Components/PageHeader/PageHeader";
import ArticlesList from "./Components/ArticlesList/ArticlesListContainer";
import Article from "./Components/Article/Article";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import EditProfile from "./Components/EditProfile/EditProfile";
import CreateArticle from "./Components/CreateArticle/CreateArticle";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<PageHeader />
				<Routes>
					<Route path="/articles?" element={<ArticlesList />} />
					<Route path="/articles/:id" element={<Article />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/edit-profile" element={<EditProfile />} />
					<Route path="/create" element={<CreateArticle />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
