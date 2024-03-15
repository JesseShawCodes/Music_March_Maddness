import { useState } from "react"
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName, onArticleUpdated }) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');

    const { user }= useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        console.log(token)
        const headers = token ? { authtoken: token } : {};

        const response = await axios.post(`/api/articles/${articleName.articleId}/comments`, {
            postedBy: name,
            text: commentText,
        }, {
            headers
        });
        const updatedArticle = response.data;

        onArticleUpdated(updatedArticle);

        // Reset name and comment text back to empty string
        setName('')
        setCommentText('')

    }

    return (
        <div id="add_comment_form" className="form-group">
            <h3>Add a Comment</h3>
            {user && <p>You are posting as {user.email}</p> }
            <label>
                Comment: <textarea 
                rows="4" cols="50" 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="form-control"
                />
            </label>
            <button onClick={addComment} className="btn btn-primary">Add Comment</button>
        </div>
    )
}

export default AddCommentForm