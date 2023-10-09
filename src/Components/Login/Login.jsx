import s from "./Login.module.css";
import { Button, Checkbox, Input } from "antd";
import { Link } from "react-router-dom";
import { authAPI } from "../../API/API";
import { useState } from "react";

const Login = () => {
	if (localStorage.getItem("isAuth")) {
		return (
			<div className={s.HelloWrapper}>
				<span className={s.hello}>You are login!</span>
				<Link to="/" className={s.toMain}>
					To main
				</Link>
			</div>
		);
	}

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});
	const [error, setError] = useState(false);

	const onChangeInput = (inputName, value) => {
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
		if (inputName === "Password") {
			if (value.length >= 1) {
				setPassword(value);
				setErrors({
					...errors,
					password: false,
				});
			} else {
				setErrors({
					...errors,
					password: true,
				});
				setPassword("");
			}
		}
	};

	const onSubmit = () => {
		for (let key in errors) {
			if (errors[key]) {
				return;
			}
		}

		let creds = { email: email, password: password };

		for (let key in creds) {
			if (creds[key].length < 1) {
				return;
			}
		}

		authAPI.login(creds);
		setTimeout(() => setError(true), 2000);
	};

	return (
		<div className={s.Login}>
			<span className={s.title}>Sign In</span>
			<div className={s.field}>
				<span className={s.fieldName}>Email address</span>
				<Input
					visibilityToggle={false}
					placeholder="Email address"
					className={`${s.fieldInput} ${errors.email ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Email", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Password</span>
				<Input.Password
					visibilityToggle={false}
					placeholder="Password"
					className={`${s.fieldInput} ${errors.password ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Password", e.target.value)}
				/>
			</div>
			<Button className={s.createButton} onClick={onSubmit}>
				Login
			</Button>
			<span className={s.signInOffer}>
				Don’t have an account? <Link to="/register">Sign Up</Link>.
			</span>

			{error ? (
				<div className={s.error} style={{ textAlign: "center" }}>
					Incorrect login or password!
				</div>
			) : null}
		</div>
	);
};

export default Login;
