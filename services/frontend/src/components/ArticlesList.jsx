
import { Link } from "react-router-dom";

const List = ({ list_items }) => {
    return (
        <>
        {list_items.map(article => (
            <div  key={article.id} className="list-container">
                <Link to={`/articles/${article.name}`} className="link-dark article-links">
                    <h3>{article.title}</h3>
                    <p>{article.content.substring(0, 150)} ...</p>
                </Link>
            </div>
        ))}
        </>
    )
}

export default List;