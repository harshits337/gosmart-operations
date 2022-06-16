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