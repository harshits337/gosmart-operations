import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import {Dashboard} from "./components/dashboard/Dashboard";
import {Category} from "./components/category/Category";
import {Products} from "./components/products/Products";
import {Orders} from "./components/orders/Orders";
function App() {
    return (
        <BrowserRouter>
            <Fragment>
                <div className="flex">
                    <div>
                        <Navbar></Navbar>
                    </div>
                    <div className="routes">
                        <Routes>
                            <Route exact path="/" element={ <Dashboard/>} />
                            <Route exact path="/dashboard" element={ <Dashboard/>} />
                            <Route exact path="/category" element={ <Category/>} />
                            <Route exact path="/products" element={ <Products/>} />
                            <Route exact path="/orders" element={ <Orders/>} />
                        </Routes>
                    </div>
                    
                </div>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;
