import { configureStore, createSlice } from "@reduxjs/toolkit";

const categoryState = createSlice({
    name: "categoryState",
    initialState: {
        categories: [],
        selectedCategory: {},
        showSubcategoryForm: false,
        showCategoryForm : false
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
    },
});

const store = configureStore({
    reducer: {
        categoryState: categoryState.reducer,
    },
});

export const categoryStateActions = categoryState.actions;
export default store;
