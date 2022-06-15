import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import Sales from "./pages/sales/Sales";
import Orders from "./pages/orders/Orders";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {

  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root"))?.user
  ).currentUser?.isAdmin;


  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        {!admin && (<Route exact path="/" element={<Login/>} />)}
      </Routes>
        {admin && (admin === true) && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/sales" element={<Sales/>} />
                <Route exact path="/users" element={<UserList/>} />
                <Route exact path="/user/:userId" element={<User/>} />
                <Route exact path="/newUser" element={<NewUser/>} />
                <Route exact path="/products" element={<ProductList/>} />
                <Route exact path="/product/:productId" element={<Product/>} />
                <Route exact path="/newproduct" element={<NewProduct/>} />
                <Route exact path="/orders" element={<Orders/>} />
              </Routes>
            </div>
          </>
        )}
    </Router>
  );
}

export default App;
