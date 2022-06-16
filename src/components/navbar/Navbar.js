import React, { Fragment } from "react";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import { useNavigate, useParams } from "react-router-dom";
import "./navbar.scss"

export const Navbar = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            url : "/dashboard"
        },
        {
            label: "Category",
            icon: "pi pi-fw pi-prime",
            url : "/category"
        },
        {
            label: "Products",
            icon: "pi pi-fw pi-compass",
            url : "/products"
        },
        {
            label: "Orders",
            icon: "pi pi-fw pi-briefcase",
            url : "/orders"
        },
        {
            label: "Users",
            icon: "pi pi-fw pi-user",
            url : "/users"
        },
    ];
    return (
        <Fragment>
            <div
                
                style={{
                    background:
                        "linear-gradient(180deg, #2E323F 0%, #0A061A 100%)",
                }}
            >
                <div>
                    <div className="card navbar-class">
                        {items.map((item,key)=>{
                            return <div key={key} className="navbar-badges flex" onClick={() => navigate(item.url)} >
                                <i className={item.icon + " icon-class"}></i>
                                <span style={{}}> {item.label}</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
