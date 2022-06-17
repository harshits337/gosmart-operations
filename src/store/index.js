import { configureStore, createSlice } from "@reduxjs/toolkit";

const categoryState = createSlice({
    name: "categoryState",
    initialState: {
        categories: [],
        selectedCategory: {},
        showSubcategoryForm: false,
        showCategoryForm : false,
        selectedSubCategory : {}
    },
    reducers: {
        setCategories(state, value) {
            state.categories = value.payload;
        },
        setSelectedCategory(state, value) {
            state.selectedCategory = value.payload;
        },
        setShowSubcategoryForm(state, value) {
            state.showSubcategoryForm  = value.payload;
        },
        setShowCategoryForm(state, value) {
            state.showCategoryForm  = value.payload;
        },
        setSelectedSubCategory(state, value) {
            state.selectedSubCategory  = value.payload;
        },
    },
});

const productState = createSlice({
    name : "productState",
    initialState : {
        selectedCategory : "",
        products : [],
        categories : [],
        selectedProduct : {},
        showProductform : false,
        productEditMode : false,
    },
    reducers : {
        setSelectedCategory(state,value){
            state.selectedCategory = value.payload;
        },
        setProducts(state,value){
            state.products = value.payload;
        },
        setCategories(state,value){
            state.categories = value.payload;
        },
        setShowProductForm(state,value){
            state.showProductform = value.payload;
        },
        setProductEditMode(state,value){
            state.productEditMode = value.payload;
        },
        setSelectedProduct(state,value){
            state.selectedProduct = value.payload;
        }
    }
})

const orderState = createSlice({
    name : "orderState",
    initialState : {
        orders : [],
        selectedOrder : {},
        showUpdateOrderForm : false
    },
    reducers : {
        setOrders(state,value){
            state.orders = value.payload;
        },
        setSelectedOrder(state,value){
            state.selectedOrder = value.payload;
        },
        setShowUpdateOrderForm(state,value){
            state.showUpdateOrderForm = value.payload;
        }
    }
})

const store = configureStore({
    reducer: {
        categoryState: categoryState.reducer,
        productState : productState.reducer,
        orderState : orderState.reducer
    },
});

export const categoryStateActions = categoryState.actions;
export const productStateActions = productState.actions;
export const orderStateActions = orderState.actions;

export default store;
