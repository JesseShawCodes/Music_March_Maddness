import List from "../components/ArticlesList";
import axios from "axios";

import { useState, useEffect } from "react";

import useUser from "../hooks/useUser";


const ArticleListPage = () => {
    const [articleList, setArticleList] = useState();
    const { user, isLoading } = useUser();

    useEffect(() => {

        const loadArticleList = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles`, {
                headers,
            });
            const articleList = response;

            setArticleList(articleList.data);
            articles_list(articleList.data)
        }
        if (isLoading) {
            loadArticleList();
        }
    }, [])

    function articles_list(list) {
        if (!list) {
            return <h1>Loading...</h1>
        }
        else {
            return <List list_items={list} />
        }
    }
    return (
        <div className="container">
            <h1>Articles</h1>
            <div>
                {
                    user ?
                        setArticleList ? articles_list(articleList) : <h3>Loading...</h3>
                        :
                        <p>You must be logged in to view this page</p>
                }
            </div>

        </div>
    )
}

export default ArticleListPage;