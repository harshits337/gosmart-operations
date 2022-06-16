import { axiosAuth } from "../../AxiosAuth";

export const getAllCategories = async () =>{
    try {
        let response = await axiosAuth.get("/rest/api/v1/category");
        return response;
    } catch (error) {
        console.log("error");
        return error.response;
    }
}

export const deleteSubcategory = async(id)=>{
    try {
        let response = await axiosAuth.delete("/rest/api/v1/subcategory/"+id);
        return response;
    } catch (error) {
        console.log("error");
        return error.response;
        
    }
}

export const addSubcategory = async(subCategoryRequest)=>{
    try {
        let response = await axiosAuth.post("/rest/api/v1/subcategory",subCategoryRequest);
        return response;
    } catch (error) {
        console.log("error");
        return error.response;
    }
}

export const deleteCategory = async(id)=>{
    try {
        let response = await axiosAuth.delete("/rest/api/v1/category/" + id);
        return response;
    } catch (error) {
        console.log("error");
        return error.response;
    }
}

export const addCategory = async(categoryRequest)=>{
    try {
        let response = await axiosAuth.post("/rest/api/v1/category",categoryRequest);
        return response;
    } catch (error) {
        console.log("error");
        return error.response;
    }
}

export const updateSubCategory = async(categoryRequest)=>{
    try {
        let response = await axiosAuth.put("/rest/api/v1/subcategory",categoryRequest);
        return response;
    } catch (error) {
        console.log("error");
        return error.response;
    }
}