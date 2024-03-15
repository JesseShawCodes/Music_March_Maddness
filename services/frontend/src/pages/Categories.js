import { Outlet } from "react-router-dom";

const Categories = () =>  {
    return (
        <div className="container app-container">
            <h1>This is the Categories View</h1>
            <Outlet />
        </div>
    )
}


export default Categories;