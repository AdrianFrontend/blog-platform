import s from "./ArticleForm.module.css";
import { useState } from "react";
import { articlesAPI } from "../../API/API";
import { Button, Input } from "antd";
import PropTypes from "prop-types";

const ArticleForm = ({ editMode, currentTitle, currentDescription, currentText, currentTags, locationPath, setEditMode }) => {
    const [tagFieldMaxId, setTagFieldMaxId] = useState("");
    const [tagFields, setTagFields] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        text: false,
    });
    const [loadDone, setLoadDone] = useState(false)
    const [loading, setLoading] = useState(false)

    if (!loadDone) {
        if (editMode) {
            setTagFieldMaxId(currentTags.length)
            setTagFields(
                currentTags.length > 0
                    ? currentTags
                    : [
                        {
                            id: tagFieldMaxId,
                            value: "",
                        },
                    ]
            )
            setTitle(currentTitle)
            setDescription(currentDescription)
            setText(currentText)
        } else {
            setTagFieldMaxId(0)
            setTagFields([
                {
                    id: 0,
                    value: "",
                },
            ])
            setTitle("")
            setDescription("")
            setText("")
        }
        setLoadDone(true)
    }


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
                    defaultValue={item.value}
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

        editMode ? articlesAPI.editArticle({ ...creds, tags, path: locationPath }) : articlesAPI.createArticle({ ...creds, tags })
        setLoading(true)
    };

    return (
        <div className={s.EditArticle}>
            <div className={s.title}>{editMode ? "Edit article" : "Create new article"}</div>
            <div className={s.field}>
                <span className={s.fieldName}>Title</span>
                <Input
                    placeholder="Title"
                    className={`${s.fieldInput} ${errors.title ? s.errorInput : null}`}
                    onChange={(e) => onChangeInput("Title", e.target.value)}
                    defaultValue={currentTitle ? currentTitle : ""}
                />
            </div>
            <div className={s.field}>
                <span className={s.fieldName}>Short description</span>
                <Input
                    placeholder="Short description"
                    className={`${s.fieldInput} ${errors.description ? s.errorInput : null}`}
                    onChange={(e) => onChangeInput("Description", e.target.value)}
                    defaultValue={currentDescription ? currentDescription : ""}
                />
            </div>
            <div className={s.field}>
                <span className={s.fieldName}>Text</span>
                <Input.TextArea
                    placeholder="Text"
                    className={`${s.fieldInput} ${s.fieldInputBody} ${errors.text ? s.errorInput : null}`}
                    onChange={(e) => onChangeInput("Text", e.target.value)}
                    defaultValue={currentText ? currentText : ""}
                />
            </div>
            <div className={s.tags}>
                <span className={s.fieldName}>Tags</span>
                {tagFieldsList}
            </div>
            <Button className={s.sendButton} onClick={onSubmit} disabled={loading}>
                Send
            </Button>
        </div>
    );
};

ArticleForm.propTypes = {
    editMode: PropTypes.bool,
    currentTitle: PropTypes.string,
    currentDescription: PropTypes.string,
    currentText: PropTypes.string,
    currentTags: PropTypes.array,
    locationPath: PropTypes.string,
    setEditMode: PropTypes.func,
};

export default ArticleForm;
