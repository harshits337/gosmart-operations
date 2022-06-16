import React from 'react'

import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            brand : "",
            details: "",
            price : "",
            categoryId : "",
            subcategoryId
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = "Name is required.";
            }
            if (!data.description) {
                errors.description = "Description is required.";
            }

            return errors;
        },
        onSubmit: async (data) => {
            data['categoryId'] = categoryId;
            console.log(data);
            let response = await addCategory(data);
            if(response.status === 201){
                let response = await getAllCategories();
                console.log(response);
                if (response.status === 200) {
                    dispatch(categoryStateActions.setCategories(response.data));
                }
                dispatch(categoryStateActions.setShowCategoryForm(false))
            } else{
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
            
        </div>
    );
