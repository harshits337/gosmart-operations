import React, { useState } from "react";

import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addImageToProduct, addProduct, getProductsForCategories, updateProduct } from "./products.http";
import { productStateActions } from "../../store";
import { Dropdown } from "primereact/dropdown";


export const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const editMode = useSelector((state) => state.productState.productEditMode);
    let categories = useSelector((state) => state.productState.categories);
    let selectedProduct = useSelector(
        (state) => state.productState.selectedProduct
    );

    const [subcategories, setSubcategories] = useState([]);
    if (editMode) {
        let subCategoriesList;
        categories.forEach((element) => {
            if (element.id === selectedProduct.categoryId) {
                subCategoriesList = element.subCategories;
            }
        });
        setSubcategories(subCategoriesList);
        dispatch(productStateActions.setProductEditMode(false))
    }
    const formik = useFormik({
        initialValues: {
            name: editMode ? selectedProduct.name : "",
            brand: editMode ? selectedProduct.brand : "",
            details: editMode ? selectedProduct.details : "",
            price: editMode ? selectedProduct.price : "",
            categoryId: editMode ? selectedProduct.categoryId : "",
            subCategoryId: editMode ? selectedProduct.subCategoryId : "",
            image : ''
        },
        validate: (data) => {
            let errors = {};
            if (!data.brand) {
                errors.brand = "Brand is required.";
            }
            if (!data.name) {
                errors.name = "Name is required.";
            }
            if (!data.price) {
                errors.description = "Description is required.";
            }

            if (!data.categoryId) {
                errors.categoryId = "Category is required.";
            }

            if (!data.subCategoryId) {
                errors.subCategoryId = "Subcategory is required.";
            }
            if (!data.price) {
                errors.price = "Prices is required.";
            }
            if (!data.details) {
                errors.details = "Details is required.";
            }

            return errors;
        },
        onSubmit: async (data) => {
            console.log(data);
            let imagePath = data.image;
            delete data.image;
            let productResponse ;
            if((Object.keys(selectedProduct).length === 0)){
                productResponse = await addProduct(data);
                const formData = new FormData();
                formData.append('image', imagePath);
                await addImageToProduct(formData,productResponse.data.value.id);
            } else {
                data['id'] = selectedProduct['id'];
                productResponse = await updateProduct(data);
            }
            
            if (productResponse.status === 201 || productResponse.status === 200) {
                let response = await getProductsForCategories(data.categoryId);
                console.log(response);
                if (response.status === 200) {
                    dispatch(productStateActions.setProducts(response.data));
                }
                dispatch(productStateActions.setShowProductForm(false));
                dispatch(productStateActions.setSelectedProduct({}))
            } else {
                console.log("eroror");
            }
        },
    });
    const isFormFieldValid = (name) =>
        !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return (
            isFormFieldValid(name) && (
                <small className="p-error">{formik.errors[name]}</small>
            )
        );
    };
    return (
        <div className="form-demo">
            <div className="flex ">
                <div style={{ width: "100% " }}>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="brand"
                                    name="brand"
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid": isFormFieldValid("brand"),
                                    })}
                                />
                                <label
                                    htmlFor="brand"
                                    className={classNames({
                                        "p-error": isFormFieldValid("brand"),
                                    })}
                                >
                                    Brand Name*
                                </label>
                            </span>
                            {getFormErrorMessage("brand")}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid": isFormFieldValid("name"),
                                    })}
                                />
                                <label
                                    htmlFor="name"
                                    className={classNames({
                                        "p-error": isFormFieldValid("name"),
                                    })}
                                >
                                    Product Name*
                                </label>
                            </span>
                            {getFormErrorMessage("name")}
                        </div>
                        <div className="field">
                            <Dropdown
                                optionLabel="name"
                                optionValue="id"
                                id="categoryId"
                                name="categoryId"
                                value={formik.values.categoryId}
                                options={categories}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    let subCategories;
                                    categories.forEach((element) => {
                                        if (element.id === e.value) {
                                            subCategories =
                                                element.subCategories;
                                        }
                                    });
                                    setSubcategories(subCategories);
                                }}
                                placeholder="Select a Category"
                                className={classNames({
                                    "p-error": isFormFieldValid("categoryId"),
                                })}
                            />
                        </div>
                        <div className="field">
                            <Dropdown
                                optionLabel="name"
                                optionValue="id"
                                id="subCategoryId "
                                name="subCategoryId"
                                value={formik.values.subCategoryId}
                                options={subcategories}
                                onChange={formik.handleChange}
                                placeholder="Select a Sub Category"
                                className={classNames({
                                    "p-error":
                                        isFormFieldValid("subCategoryId"),
                                })}
                            />
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="details"
                                    name="details"
                                    value={formik.values.details}
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid":
                                            isFormFieldValid("details"),
                                    })}
                                />
                                <label
                                    htmlFor="details"
                                    className={classNames({
                                        "p-error": isFormFieldValid("details"),
                                    })}
                                >
                                    Product Details*
                                </label>
                            </span>
                            {getFormErrorMessage("details")}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="price"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid": isFormFieldValid("price"),
                                    })}
                                />
                                <label
                                    htmlFor="name"
                                    className={classNames({
                                        "p-error": isFormFieldValid("price"),
                                    })}
                                >
                                    Price*
                                </label>
                            </span>
                            {getFormErrorMessage("price")}
                        </div>
                        {Object.keys(selectedProduct).length === 0 ? <div className="field">
                            <input type="file" id="image" name="image"  onChange={(e) => {
                                console.log(e.target.files);
                                formik.values.image = e.target.files[0];
                                }} />
                            </div> : ""}

                        <Button
                            type="submit"
                            label="Add Product"
                            className="mt-2"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};
