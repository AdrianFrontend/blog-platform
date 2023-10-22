import { Button, Checkbox, Input } from "antd";
import s from "./Register.module.css";
import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../../API/API";

const Register = () => {
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

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [policyCheckbox, setPolicyCheckbox] = useState(false);
	const [errors, setErrors] = useState({
		username: false,
		email: false,
		password: false,
		repeatPassword: false,
	});
	const [error, setError] = useState(false);
	const [sendDisabled, setSendDisabled] = useState(true);
	const [loading, setLoading] = useState(false)

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
		if (inputName === "Password") {
			if (value.length >= 6 && value.length <= 40 && value.split(" ").length === 1) {
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
				setPassword("0");
			}
		}
		if (inputName === "Repeat Password") {
			if (value === password) {
				setRepeatPassword(value);
				setErrors({
					...errors,
					repeatPassword: false,
				});
			} else {
				setErrors({
					...errors,
					repeatPassword: true,
				});
				setRepeatPassword("");
			}
		}
	};

	const onSubmit = () => {
		for (let key in errors) {
			if (errors[key]) {
				return;
			}
		}

		let creds = { username: username, email: email, password: repeatPassword };

		for (let key in creds) {
			if (creds[key].length < 3) {
				setErrors({...error, [key]: true})
				return;
			}
		}

		if (!policyCheckbox) {
			return;
		}

		authAPI.register(creds);
		setLoading(true)
		setTimeout(() => {
			setError(true)
			setLoading(false)
		}, 2000);
	};

	return (
		<div className={s.Register}>
			<span className={s.title}>Create new account</span>
			<div className={s.field}>
				<span className={s.fieldName}>Username</span>
				<Input
					placeholder="Username"
					className={`${s.fieldInput} ${errors.username ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Username", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Email address</span>
				<Input
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
				{errors.password ? (
					<span className={s.error}>The password must consist of 6-40 characters.</span>
				) : null}
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Repeat Password</span>
				<Input.Password
					visibilityToggle={false}
					placeholder="Repeat Password"
					className={`${s.fieldInput} ${errors.repeatPassword ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Repeat Password", e.target.value)}
				/>
				{errors.repeatPassword ? <span className={s.error}>Passwords must match</span> : null}
			</div>
			<div className={s.privacyCheck}>
				<label>
					<Checkbox
						className={s.privacyCheckbox}
						onChange={(e) => {
							setPolicyCheckbox(e.target.checked);
							setSendDisabled(!sendDisabled);
						}}
					></Checkbox>
					<span className={s.checkboxText}>I agree to the processing of my personal information</span>
				</label>
			</div>
			<Button className={s.createButton} onClick={onSubmit} disabled={sendDisabled}>
				Create
			</Button>
			<span className={s.signInOffer}>
				Already have an account? <Link to="/login">Sign In</Link>.
			</span>

			{error ? (
				<div className={s.error} style={{ textAlign: "center" }}>
					Incorrect Email!
				</div>
			) : null}
		</div>
	);
};

export default Register;
