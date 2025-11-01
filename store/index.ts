import {configureStore } from "@reduxjs/toolkit";
import { EatReducer, EatState } from './eatReducer';
import { UserReducer, UserState } from "./userReducer";
import { DailyReducer, DailyState } from './dailyReducer';
import { MealReducer, MealState } from "./mealReducer";
import { GoalReducer, GoalState } from '@/store/goalReducer';

export const store = configureStore({
    reducer:{
        Eat:EatReducer,
        User:UserReducer,
        Daily:DailyReducer,
        Meal : MealReducer,
        Goal : GoalReducer,
    },
})

export interface RootState {
  User: UserState;
  Eat: EatState;
  Meal: MealState;
  Daily : DailyState;
  Goal : GoalState;
}