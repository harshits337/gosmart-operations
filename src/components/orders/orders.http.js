import { axiosAuth } from "../../AxiosAuth"

export const getAllOrders = async()=>{
    try {
        let response = await axiosAuth.get('/rest/api/v1/orders/all');
        return response;
    } catch (error) {
        return error.response;
    }
}