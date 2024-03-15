import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useState, useEffect } from "react";
import axios from 'axios';

import CommentsList from "./CommentsList";
import AddCommentForm from "../components/AddCommentForm";

import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpVote: false});
    const { canUpVote } = articleInfo;

    const { articleId } = useParams();

    const { user, isLoading }= useUser();
    
    const article = articles.find(article => article.name === articleId)

    console.log(user)

    function upvotesCount(upvotes) {
        if (upvotes) {
            return `This article has ${articleInfo.upvotes} upvotes`
        }
    }
    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};

            const response = await axios.get(`/api/articles/${articleId}`, {
                headers,

            });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo)
        }
        if (!isLoading) {
            loadArticleInfo();
        }

    }, [articleId, isLoading, user])

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};

        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {
            headers
        });

        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);

    }

    if (!article) {
        return <NotFoundPage />
    }

    function CheckComments(comments) {
        if (!comments.comments) {
            return <h1>No Comment</h1>
        }
        else {
            return <CommentsList comments={articleInfo.comments} />
        }
    }

    return (
        <>
        <h1>{articleInfo.title}</h1>
        <div className="upvotes_section">
            <button onClick={addUpvote}>{canUpVote ? 'Upvote' : 'Already Voted'}</button><p>{upvotesCount(articleInfo.upvotes)}</p>
        </div>
        <p>{articleInfo.content}</p>
        <AddCommentForm articleName={{articleId}} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/><CheckComments comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;