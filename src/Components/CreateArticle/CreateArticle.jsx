import { Button, Input } from "antd";
import s from "./CreateArticle.module.css";
import { useState } from "react";
import { articlesAPI } from "../../API/API";

const CreateArticle = () => {
	const [tagFields, setTagFields] = useState([
		{
			id: 0,
			value: "",
		},
	]);
	const [tagFieldMaxId, setTagFieldMaxId] = useState(0);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [text, setText] = useState("");
	const [errors, setErrors] = useState({
		title: false,
		description: false,
		text: false,
	});

	const addTagField = () => {
		if (tagFields.length < 6) {
			setTagFieldMaxId(tagFieldMaxId + 1);
			setTagFields([
				...tagFields,
				{
					id: tagFieldMaxId + 1,
					value: "",
				},
			]);
		}
	};

	const deleteTagField = (id) => {
		const idx = tagFields.findIndex((item) => item.id === id);

		setTagFields([...tagFields.slice(0, idx), ...tagFields.slice(idx + 1, tagFields.length)]);
	};

	const onChangeTagField = (id, value) => {
		const idx = tagFields.findIndex((item) => item.id === id);

		if (value.length < 20) {
			setTagFields([
				...tagFields.slice(0, idx),
				{
					id: id,
					value: value,
					error: false,
				},
				...tagFields.slice(idx + 1, tagFields.length),
			]);
		} else {
			setTagFields([
				...tagFields.slice(0, idx),
				{
					id: id,
					value: value,
					error: true,
				},
				...tagFields.slice(idx + 1, tagFields.length),
			]);
		}
	};

	const tagFieldsList = tagFields.map((item) => {
		return (
			<div className={s.tagField} key={item.id}>
				<Input
					className={`${s.tagFieldInput} ${item.error ? s.errorInput : null}`}
					placeholder="Tag"
					onChange={(e) => onChangeTagField(item.id, e.target.value)}
				/>
				<Button
					className={s.deleteButton}
					disabled={tagFields.length < 2}
					onClick={() => deleteTagField(item.id)}
				>
					Delete
				</Button>
				<Button className={s.addButton} onClick={() => addTagField()}>
					Add tag
				</Button>
			</div>
		);
	});

	const onChangeInput = (inputName, value) => {
		if (inputName === "Title") {
			if (value.length >= 1 && value.length <= 75) {
				setTitle(value);
				setErrors({
					...errors,
					title: false,
				});
			} else {
				setErrors({
					...errors,
					title: true,
				});
				setTitle("");
			}
		}
		if (inputName === "Description") {
			if (value.length >= 1 && value.length <= 250) {
				setDescription(value);
				setErrors({
					...errors,
					description: false,
				});
			} else {
				setErrors({
					...errors,
					description: true,
				});
				setDescription("");
			}
		}
		if (inputName === "Text") {
			if (value.length >= 1 && value.length < 5000) {
				setText(value);
				setErrors({
					...errors,
					text: false,
				});
			} else {
				setErrors({
					...errors,
					text: true,
				});
				setText("");
			}
		}
	};

	const onSubmit = () => {
		for (let key in errors) {
			if (errors[key]) {
				return;
			}
		}

		let tags = [];

		for (let item of tagFields) {
			if (item.error) {
				return;
			} else if (item.value.length > 0) tags.push(item.value);
		}

		let creds = { title: title, description: description, body: text };

		for (let key in creds) {
			if (creds[key].length < 1) {
				return;
			}
		}

		articlesAPI.createArticle({ ...creds, tags });
		location.reload();
	};

	return (
		<div className={s.CreateArticle}>
			<div className={s.title}>Create new article</div>
			<div className={s.field}>
				<span className={s.fieldName}>Title</span>
				<Input
					placeholder="Title"
					className={`${s.fieldInput} ${errors.title ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Title", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Short description</span>
				<Input
					placeholder="Short description"
					className={`${s.fieldInput} ${errors.description ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Description", e.target.value)}
				/>
			</div>
			<div className={s.field}>
				<span className={s.fieldName}>Text</span>
				<Input.TextArea
					placeholder="Text"
					className={`${s.fieldInput} ${s.fieldInputBody} ${errors.text ? s.errorInput : null}`}
					onChange={(e) => onChangeInput("Text", e.target.value)}
				/>
			</div>
			<div className={s.tags}>
				<span className={s.fieldName}>Tags</span>
				{tagFieldsList}
			</div>
			<Button className={s.sendButton} onClick={onSubmit}>
				Send
			</Button>
		</div>
	);
};

export default CreateArticle;
