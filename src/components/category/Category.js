import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryStateActions } from "../../store";
import { deleteCategory, deleteSubcategory, getAllCategories } from "./category.http";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SubCategoryForm } from "./SubCategoryForm";
export const Category = () => {
    let categories = useSelector((state) => state.categoryState.categories);
    const dispatch = useDispatch();
	let visibleSubcategoryForm = useSelector(state=>state.categoryState.showSubcategoryForm);
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {}}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={async () => {
                        await deleteSubcategory(rowData.id);
                        let response = await getAllCategories();
                        if (response.status === 200) {
                            dispatch(
                                categoryStateActions.setCategories(
                                    response.data
                                )
                            );
                        }
                    }}
                />
            </React.Fragment>
        );
    };

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
                                        <Column
                                            field="id"
                                            header="Id"
                                            style={{ width: "30%" }}
                                        ></Column>
                                        <Column
                                            field="name"
                                            header="Name"
                                        ></Column>
                                        <Column
                                            field="description"
                                            header="Description"
                                        ></Column>
                                        <Column
                                            header="Actions"
                                            body={actionBodyTemplate}
                                        ></Column>
                                    </DataTable>
                                    <div>
                                        <Button
                                            label="Add Sub Category"
                                            className="p-button-primary m-2"
                                            onClick={() => {
												dispatch(categoryStateActions.setSelectedCategory(item));
												dispatch(categoryStateActions.setShowSubcategoryForm(true))

											}}
                                        />
                                        <Button
                                            label="Delete Category"
                                            className="p-button-danger m-2"
                                            onClick={ async () => {
												let response = await deleteCategory(item.id);
												if(response.status === 200){
													response = await getAllCategories();
													if (response.status === 200) {
														dispatch(categoryStateActions.setCategories(response.data));
													}
												}
											}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AccordionTab>
                    );
                })}
            </Accordion>
            <Dialog
                header="Add Sub Category"
                visible={visibleSubcategoryForm}
                style={{ width: "20%" }}
                modal
				onHide={() => dispatch(categoryStateActions.setShowSubcategoryForm(false))}
            >
                <SubCategoryForm></SubCategoryForm>
            </Dialog>
        </Fragment>
    );
};
