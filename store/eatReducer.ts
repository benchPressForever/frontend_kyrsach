import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { IDailySummariesResponse } from '@/types/daily-summaries.types';
import { IFoodResponse } from '@/types/food.types';


export interface EatState {
    ProductList: IFoodResponse[];
    isLoading: boolean;
    isNeedUpdate:boolean;
}

const defaultState : EatState = {
    ProductList:[],
    isLoading:false,
    isNeedUpdate:false,
}


export const setProductList = createAction<IFoodResponse[]>("SET_PRODUCT_LIST")
export const delProductList = createAction<string>("DEL_PRODUCT_LIST")
export const addProducts = createAction<IFoodResponse[]>("ADD_PRODUCTS")


export const noUpdateNeeded = createAction("NO _UPDATE_NEEDED")
export const neededUpdate = createAction("NEEDED_UPDATE")


export const EatReducer =  createReducer(defaultState,(builder) => {
    builder
    .addCase(neededUpdate, (state) => {
        state.isNeedUpdate = true
    })
    .addCase(noUpdateNeeded, (state) => {
        state.isNeedUpdate = false
    })
    .addCase(delProductList, (state,action: PayloadAction<string>) => {
        state.ProductList = state.ProductList.filter((e) => e.id !== action.payload) 
    })
    .addCase(setProductList, (state, action: PayloadAction<IFoodResponse[]>) => {
        state.ProductList = action.payload    
    })
    .addCase(addProducts, (state, action: PayloadAction<IFoodResponse[]>) => {
        state.ProductList = [...state.ProductList,...action.payload]
    })
})