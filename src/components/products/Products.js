import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dialog } from "primereact/dialog";

import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { categoryStateActions, productStateActions } from "../../store";
import { getAllCategories } from "../category/category.http";
import { Dropdown } from "primereact/dropdown";
import { deleteProduct, getProductsForCategories } from "./products.http";
import { ProductForm } from "./ProductForm";

export const Products = () => {
    const dispatch = useDispatch();
    let products = useSelector((state) => state.productState.products);
    let categories = useSelector((state) => state.productState.categories);
	let selectedCategory  = (useSelector(state=>state.productState.selectedCategory))
    let showProductform = useSelector(
        (state) => state.productState.showProductform
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        console.log("row", rowData);
                        dispatch(productStateActions.setProductEditMode(true));
						dispatch(productStateActions.setSelectedProduct(rowData));
						dispatch(productStateActions.setShowProductForm(true))
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={async () => {
                        await deleteProduct(rowData.id);
                        fetchProducts(selectedCategory);
                    }}
                />
            </React.Fragment>
        );
    };
    useEffect(() => {
        (async () => {
            let response = await getAllCategories();
            if (response.status === 200) {
                dispatch(productStateActions.setCategories(response.data));
            }
        })();
    }, []);

    const fetchProducts = async (id) => {
        let response = await getProductsForCategories(id);
        if (response.status === 200) {
            dispatch(productStateActions.setProducts(response.data));
        }
    };
    return (
        <Fragment>
            <h2>Products</h2>
            <div className="flex">
                <Dropdown
                    optionLabel="name"
                    optionValue="id"
                    value={useSelector(
                        (state) => state.productState.selectedCategory
                    )}
                    options={categories}
                    onChange={async (e) => {
                        dispatch(
                            productStateActions.setSelectedCategory(e.value)
                        );
                        await fetchProducts(e.value);
                    }}
                    placeholder="Select a Category"
                    style={{ width: "30%", height: "10%", margin: "1rem" }}
                />
                <p className="" style={{ marginLeft: "35rem" }}>
                    <Button
                        className="p-button-primary"
                        label="Add Product"
                        onClick={() => {
                            dispatch(
                                productStateActions.setShowProductForm(true)
                            );
                        }}
                    ></Button>
                </p>
            </div>
            <div style={{width : "80%","margin" :"1rem"}}>
                <DataTable
                    value={products}
                    responsiveLayout="scroll"
                    header="Products"
                    showGridlines
                >
                    <Column
                        field="id"
                        header="Id"
                        style={{ width: "25%" }}
                    ></Column>
                    <Column field="brand" header="Brand"></Column>
					<Column field="name" header="Name"></Column>
                    <Column field="details" header="details"></Column>
					<Column field="price" header="price"></Column>
                    <Column header="Actions" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
            <Dialog
                header="Add Product"
                visible={showProductform}
                style={{ width: "20%" }}
                modal
                onHide={() => {
                    dispatch(productStateActions.setShowProductForm(false));
                }}
            >
                <ProductForm></ProductForm>
            </Dialog>
        </Fragment>
    );
};
