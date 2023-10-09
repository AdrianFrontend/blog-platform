import s from "./PageHeader.module.css";
import { Link } from "react-router-dom";
import avatarPlaceholder from "../../img/avatar-placeholder.png";

const PageHeader = () => {
	const logoutFunc = () => {
		localStorage.clear();
		location.replace("/login");
	};

	const cutText = (text, maxLength) => {
		if (maxLength > text.length) {
			return text;
		}

		let lastSpace = text.slice(0, maxLength).lastIndexOf("");
		return text.slice(0, lastSpace) + "...";
	};

	if (!localStorage.getItem("isAuth")) {
		return (
			<div className={s.PageHeader}>
				<Link to="/" className={s.mainPageLink}>
					<span className={s.appTitle}>Realworld Blog</span>
				</Link>
				<Link to="/login" className={s.signInLink}>
					Sign In
				</Link>
				<Link to="/register" className={s.signUpLink}>
					Sign Up
				</Link>
			</div>
		);
	} else {
		return (
			<div className={s.PageHeader}>
				<Link to="/" className={s.mainPageLink}>
					<span className={s.appTitle}>Realworld Blog</span>
				</Link>
				<Link to="/create" className={s.createArticleLink}>
					Create article
				</Link>
				<Link to="/edit-profile" className={s.user}>
					<span className={s.username}>{cutText(localStorage.getItem("username"), 6)}</span>
					<img
						className={s.avatar}
						src={localStorage.getItem("avatarURL") ? localStorage.getItem("avatarURL") : avatarPlaceholder}
					/>
				</Link>
				<Link to="/" className={s.logoutButton} onClick={logoutFunc}>
					Logout
				</Link>
			</div>
		);
	}
};

export default PageHeader;
