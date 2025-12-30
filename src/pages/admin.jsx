import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full border-4 border-blue-600 flex">
            <div className="w-[300px] h-full bg-red-900 flex flex-col">
                <h1 className="font-bold">Using a tags</h1>
                <a href="/admin/">Orders</a>
                <a href="/admin/products">Products</a>
                <a href="/admin/users">Users</a>
                <h1 className="font-bold">Using Link tags</h1>
                <Link to="/admin/">Orders</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>                
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-yellow-400">
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>}/>
                    <Route path="/products" element={<h1>Products Page</h1>}/>
                    <Route path="/users" element={<h1>Users Page</h1>}/>
                </Routes>                
            </div>
        </div>
    )
}
//instead of w-[calc(100%-300px)] you can use flex-1