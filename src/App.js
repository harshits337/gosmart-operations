import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
function App() {
    return (
        <BrowserRouter>
            <Fragment>
                <div className="flex">
                    <div>
                        <Navbar></Navbar>
                    </div>
                    {/* <div>
                        <Routes>
						
						</Routes>
                    </div> */}
                </div>
            </Fragment>
        </BrowserRouter>
    );
}

export default App;
