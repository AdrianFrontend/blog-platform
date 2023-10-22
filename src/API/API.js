import axios from "axios";

export const authAPI = {
	register({ username, email, password }) {
		axios
			.post("https://blog.kata.academy/api/users", {
				user: {
					username: username,
					email: email,
					password: password,
				},
			})
			.then((r) => {
				console.log(r);
				if (r.status == 422) {
					return "Email or Username is already taken!";
				} else if (r.status == 200) {
					localStorage.setItem("authToken", r.data.user.token);
					localStorage.setItem("username", r.data.user.username);
					localStorage.setItem("email", r.data.user.email);
					localStorage.setItem("bio", r.data.user.bio ? r.data.user.bio : "");
					localStorage.setItem("avatarURL", r.data.user.image ? r.data.user.image : "");
					localStorage.setItem("isAuth", true);
					location.replace("/");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
	login({ email, password }) {
		if (localStorage.getItem("authToken")) {
			axios
				.get("https://blog.kata.academy/api/user", {
					headers: {
						Authorization: `Token ${localStorage.getItem("authToken")}`,
					},
				})
				.then((r) => {
					localStorage.setItem("authToken", r.data.user.token);
					localStorage.setItem("username", r.data.user.username);
					localStorage.setItem("email", r.data.user.email);
					localStorage.setItem("bio", r.data.user.bio ? r.data.user.bio : "");
					localStorage.setItem("avatarURL", r.data.user.image ? r.data.user.image : "");
					localStorage.setItem("isAuth", true);
					location.reload();
				});
		} else {
			axios
				.post("https://blog.kata.academy/api/users/login", {
					user: {
						email: email,
						password: password,
					},
				})
				.then((r) => {
					if (r.status == 200) {
						localStorage.setItem("authToken", r.data.user.token);
						localStorage.setItem("username", r.data.user.username);
						localStorage.setItem("email", r.data.user.email);
						localStorage.setItem("bio", r.data.user.bio ? r.data.user.bio : "");
						localStorage.setItem("avatarURL", r.data.user.image ? r.data.user.image : "");
						localStorage.setItem("isAuth", true);
						location.replace("/");
					}
				})
				.catch((e) => e);
		}
	},
	updateUserInfo({ email, username, bio, image }) {
		axios
			.put(
				"https://blog.kata.academy/api/user",
				{
					user: {
						email: email,
						username: username,
						bio: bio,
						image: image,
					},
				},
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("authToken")}`,
					},
				}
			)
			.then((r) => {
				if (r.status == 200) {
					localStorage.setItem("authToken", r.data.user.token);
					localStorage.setItem("username", r.data.user.username);
					localStorage.setItem("email", r.data.user.email);
					localStorage.setItem("bio", r.data.user.bio ? r.data.user.bio : "");
					localStorage.setItem("avatarURL", r.data.user.image ? r.data.user.image : "");
					localStorage.setItem("isAuth", true);
					location.reload();
				}
			})
			.catch((e) => e);
	},
};

export const articlesAPI = {
	async getArticles(page) {
		return axios
			.get(`https://blog.kata.academy/api/articles?limit=5&offset=${(page - 1) * 5}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("authToken")}`,
				},
			})
			.then((r) => r.data);
	},
	like(slug) {
		axios.post(
			`https://blog.kata.academy/api/articles/${slug}/favorite`,
			{},
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("authToken")}`,
				},
			}
		);
	},
	unlike(slug) {
		axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("authToken")}`,
			},
		});
	},
	async getArticle(path) {
		return axios
			.get(`https://blog.kata.academy/api${path}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("authToken")}`,
				},
			})
			.then((r) => r.data.article);
	},
	createArticle({ title, description, body, tags }) {
		axios
			.post(
				"https://blog.kata.academy/api/articles",
				{
					article: {
						title: title,
						description: description,
						body: body,
						tags: tags,
					},
				},
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("authToken")}`,
					},
				}
			)
			.then((r) => location.replace("/"));
	},
	editArticle({ title, description, body, tags, path }) {
		axios
			.put(
				`https://blog.kata.academy/api${path}`,
				{
					article: {
						title: title,
						description: description,
						body: body,
						tags: tags,
					},
				},
				{
					headers: {
						Authorization: `Token ${localStorage.getItem("authToken")}`,
					},
				}
			)
			.then(() => location.reload());
	},
	deleteArticle(slug) {
		axios
			.delete(`https://blog.kata.academy/api/articles/${slug}`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("authToken")}`,
				},
			})
			.then(() => location.replace("/"));
	},
};
