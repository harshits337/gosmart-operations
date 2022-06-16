import { axiosAuth } from "../../AxiosAuth"

export const getProductsForCategories = async(categoryId)=>{
    try {
        let response = await axiosAuth.get("/rest/api/v1/products/category/" + categoryId);
        return response;
    } catch (error) {
        console.log("error");
        return error;
    }
}