import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryStateActions } from "../../store";
import { deleteSubcategory, getAllCategories } from "./category.http";
import { Accordion, AccordionTab } from "primereact/accordion";

import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export const Category = () => {
    let categories = useSelector((state) => state.categoryState.categories);

    const dispatch = useDispatch();
	
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => {}} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={async() => {
					await deleteSubcategory(rowData.id);
					let response = await getAllCategories();
					if (response.status === 200) {
						dispatch(categoryStateActions.setCategories(response.data));
					}
				}} />
            </React.Fragment>
        );
    }

    useEffect(() => {
        (async () => {
            try {
                let response = await getAllCategories();
                console.log(response);
                if (response.status === 200) {
                    dispatch(categoryStateActions.setCategories(response.data));
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <Fragment>
            <h2 className="ml-4">All Categories</h2>
            <Accordion
                activeIndex={0}
                style={{ padding: "1rem", width: "80%" }}
            >
                {categories.map((item, key) => {
                    return (
                        <AccordionTab header={item.name} key={key}>
                            <div>
                                <div className="card">
                                    <DataTable
                                        value={item.subCategories}
                                        responsiveLayout="scroll"
										header="Sub Categories"
										showGridlines 
                                    >
                                        <Column field="id" header="Id" style={{width:'30%'}}></Column>
                                        <Column
                                            field="name"
                                            header="Name"
                                        ></Column>
	                                    <Column field="description" header="Description"></Column>
										<Column  header="Actions" body={actionBodyTemplate}></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </AccordionTab>
                    );
                })}
            </Accordion>
        </Fragment>
    );
};