import { axiosAuth } from "../../AxiosAuth";

export const getProductsForCategories = async (categoryId) => {
    try {
        let response = await axiosAuth.get(
            "/rest/api/v1/products/category/" + categoryId
        );
        return response;
    } catch (error) {
        console.log("error");
        return error;
    }
};

export const addProduct = async (productRequest) => {
    try {
        let response = await axiosAuth.post(
            "/rest/api/v1/products",
            productRequest
        );
        return response;
    } catch (error) {
        console.log("error");
        return error;
    }
};

export const updateProduct = async (updateProductRequest) => {
    try {
        let response = await axiosAuth.put(
            "/rest/api/v1/products",
            updateProductRequest
        );
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteProduct = async (id) => {
    try {
        let response = await axiosAuth.delete("/rest/api/v1/products/" + id);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const addImageToProduct = async (formData, productId) => {
    try {
        let headers = {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
        };
        let response = await axiosAuth.put(
            "/rest/api/v1/products/image/" + productId,
            formData,
            headers
        );
        return response;
    } catch (error) {
        return error.response;
    }
};
