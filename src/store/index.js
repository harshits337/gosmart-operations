import { configureStore, createSlice } from "@reduxjs/toolkit";


const categoryState = createSlice({
    name :"categoryState",
    initialState : {
        categories : [],
     },
     reducers : {
         setCategories(state,value){
             state.categories=value.payload;
         }
     }
})

const store = configureStore({
    reducer : {
        categoryState : categoryState.reducer
    }
})

export const categoryStateActions = categoryState.actions;
export default store;