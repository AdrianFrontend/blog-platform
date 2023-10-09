import { useState } from "react";
import s from "./EditProfile.module.css";
import { Button, Input } from "antd";
import { authAPI } from "../../API/API";

const EditProfile = () => {
	if (!localStorage.getItem("isAuth")) {
		return;
	}

	const [username, setUsername] = useState(localStorage.getItem("username"));
	const [email, setEmail] = useState(localStorage.getItem("email"));
	const [bio, setBio] = useState(localStorage.getItem("bio") ? localStorage.getItem("bio") : "");
	const [avatarURL, setAvatarURL] = useState(
		localStorage.getItem("avatarURL") ? localStorage.getItem("avatarURL") : ""
	);
	const [errors, setErrors] = useState({
		username: false,
		email: false,
		bio: false,
		avatarURL: false,
	});

	const isValidUrl = (urlString) => {
		var urlPattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return !!urlPattern.test(urlString);
	};

	const onChangeInput = (inputName, value) => {
		if (inputName === "Username") {
			if (value.length >= 3 && value.length <= 20 && value.split(" ").length === 1) {
				setUsername(value);
				setErrors({
					...errors,
					username: false,
				});
			} else {
				setErrors({
					...errors,
					username: true,
				});
				setUsername("");
			}
		}
		if (inputName === "Email") {
			if (value.match(/^\S+@\S+$/)) {
				setEmail(value);
				setErrors({
					...errors,
					email: false,
				});
			} else {
				setErrors({
					...errors,
					email: true,
				});
				setEmail("");
			}
		}
		if (inputName === "Bio") {
			if (value.length >= 6 && value.length <= 40) {
				console.log(1);
				setBio(value);
				setErrors({
					...errors,
					bio: false,
				});
			} else {
				setErrors({
					...errors,
					bio: true,
				});
				setBio("");
			}
		}
		if (inputName === "avatarURL") {
			if (isValidUrl(value)) {
				setAvatarURL(value);
				setErrors({
					...errors,
					avatarURL: false,
				});
			} else {
				setErrors({
					...errors,
					avatarURL: true,
				});
				setAvatarURL("");
			}
		}
	};

	const onSubmit = () => {
		for (let key in errors) {
			if (errors[key]) {
				return;
			}
		}
		let creds = { username: username, email: email, bio: bio, image: avatarURL };

		authAPI.updateUserInfo(creds);
	};

	return (
		<div className={s.EditProfile}>
			<span className={s.title}>Edit Profile</span>
			<div className={s.field}>
				<span className={s.fieldName}>Username</span>
				<Input
					placeholder="Username"
					className={`${s.fieldInput} ${errors.username ? s.errorInput : null}`}
					defaultValue={username}
					onChange={(e) => onChangeInput("Username", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Email address</span>
				<Input
					placeholder="Email address"
					className={`${s.fieldInput} ${errors.email ? s.errorInput : null}`}
					defaultValue={email}
					onChange={(e) => onChangeInput("Email", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Bio</span>
				<Input
					placeholder="Bio"
					className={`${s.fieldInput} ${errors.bio ? s.errorInput : null}`}
					defaultValue={bio}
					onChange={(e) => onChangeInput("Bio", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Avatar image (url)</span>
				<Input
					placeholder="Avatar image"
					className={`${s.fieldInput} ${errors.avatarURL ? s.errorInput : null}`}
					defaultValue={avatarURL}
					onChange={(e) => onChangeInput("avatarURL", e.target.value)}
				/>
			</div>
			<Button className={s.createButton} onClick={onSubmit}>
				Save
			</Button>
		</div>
	);
};

export default EditProfile;
