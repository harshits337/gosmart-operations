import React, { Fragment } from "react";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import "./navbar.scss"

export const Navbar = () => {
    const items = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
        },
        {
            label: "Category",
            icon: "pi pi-fw pi-prime",
        },
        {
            label: "Products",
            icon: "pi pi-fw pi-compass",
        },
        {
            label: "Orders",
            icon: "pi pi-fw pi-briefcase",
        },
        {
            label: "Users",
            icon: "pi pi-fw pi-user",
        },
    ];
    return (
        <Fragment>
            <Sidebar
                visible={true}
                showCloseIcon={false}
                onHide={() => {}}
                style={{
                    background:
                        "linear-gradient(180deg, #2E323F 0%, #0A061A 100%)",
                }}
            >
                <div>
                    <div className="card">
                        {items.map((item,key)=>{
                            return <div key={key} className="navbar-badges flex" >
                                <i className={item.icon + " icon-class"}></i>
                                <span style={{}}> {item.label}</span>
                            </div>
                        })}
                    </div>
                </div>
            </Sidebar>
        </Fragment>
    );
};
