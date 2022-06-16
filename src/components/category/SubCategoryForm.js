import React from 'react'
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSubcategory, getAllCategories } from './category.http';
import { categoryStateActions } from '../../store';

export const SubCategoryForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let categoryId = useSelector(state=>state.categoryState.selectedCategory?.id);
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
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
            let response = await addSubcategory(data);
            if(response.status === 201){
                let response = await getAllCategories();
                console.log(response);
                if (response.status === 200) {
                    dispatch(categoryStateActions.setCategories(response.data));
                }
                dispatch(categoryStateActions.setShowSubcategoryForm(false))
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
            <div className="flex ">
                <div style={{width:"100% "}}>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    autoFocus
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
                                    Name*
                                </label>
                            </span>
                            {getFormErrorMessage("name")}
                        </div>
                      
                        <div className="field">
                            <span className="p-float-label">
                                <InputText
                                    id="description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className={classNames({
                                        "p-invalid":
                                            isFormFieldValid("description"),
                                    })}
                                />
                                <label
                                    htmlFor="description"
                                    className={classNames({
                                        "p-error": isFormFieldValid("description"),
                                    })}
                                >
                                    Description*
                                </label>
                            </span>
                            {getFormErrorMessage("description")}
                        </div>
                      

                        <Button
                            type="submit"
                            label="Add"
                            className="mt-2"
                        />
                    </form>
                    
                </div>
            </div>
        </div>
    );
}
