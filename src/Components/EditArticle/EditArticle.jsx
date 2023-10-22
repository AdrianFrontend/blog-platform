import PropTypes from "prop-types";
import ArticleForm from "../ArticleForm/ArticleForm";

const EditArticle = ({ currentTitle, currentDescription, currentText, currentTags, locationPath, setEditMode }) => {
	if (!localStorage.getItem("isAuth")) {
		location.replace("/login")
	} else {
		return <ArticleForm editMode={true} currentTitle={currentTitle} currentDescription={currentDescription} currentText={currentText} currentTags={currentTags} locationPath={locationPath} setEditMode={setEditMode} />
	}
};

EditArticle.propTypes = {
	currentTitle: PropTypes.string,
	currentDescription: PropTypes.string,
	currentText: PropTypes.string,
	currentTags: PropTypes.array,
	locationPath: PropTypes.string,
	setEditMode: PropTypes.func,
};

export default EditArticle;
