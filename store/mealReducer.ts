import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit"
import {IMealGetResponse} from "../types/meal.types"
import { IMealFoodResponse } from "@/types/meal-food.types";




export interface MealState {
  meals: IMealGetResponse[];
  selectedMealFood: IMealFoodResponse | undefined;
  selectedMeal: IMealGetResponse | undefined;
  isModalWeightVisible: boolean;
  isModalFoodActionVisible: boolean;
  isModalMealActionVisible: boolean;
}

const defaultState: MealState = {
  meals: [],
  selectedMealFood: undefined,
  selectedMeal: undefined,
  isModalWeightVisible: false,
  isModalFoodActionVisible: false,
  isModalMealActionVisible: false
}

export const setMeals = createAction<IMealGetResponse[]>("SET_MEALS");
export const setSelectedMealFood = createAction<IMealFoodResponse | undefined>("SET_SELECTED_MEAL_FOOD");
export const setSelectedMeal = createAction<IMealGetResponse | undefined>("SET_SELECTED_MEAL");

export const changeIsModalWeightVisible = createAction("CHANGE_IS_MODAL_WEIGHT_VISIBLE");
export const changeIsModalFoodActionVisible = createAction("CHANGE_IS_MODAL_FOOD_ACTION_VISIBLE");
export const changeIsModalMealActionVisible = createAction("CHANGE_IS_MODAL_MEAL_ACTION_VISIBLE");

export const MealReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(setMeals, (state, action: PayloadAction<IMealGetResponse[]>) => {
      state.meals = action.payload;
    })
    .addCase(setSelectedMealFood, (state, action: PayloadAction<IMealFoodResponse | undefined>) => {
      state.selectedMealFood = action.payload;
    })
    .addCase(setSelectedMeal, (state, action: PayloadAction<IMealGetResponse | undefined>) => {
      state.selectedMeal = action.payload;
    })
    .addCase(changeIsModalWeightVisible, (state) => {
      state.isModalWeightVisible = !state.isModalWeightVisible;
    })
    .addCase(changeIsModalFoodActionVisible, (state) => {
      state.isModalFoodActionVisible = !state.isModalFoodActionVisible;
    })
    .addCase(changeIsModalMealActionVisible, (state) => {
      state.isModalMealActionVisible = !state.isModalMealActionVisible;
    });
});


