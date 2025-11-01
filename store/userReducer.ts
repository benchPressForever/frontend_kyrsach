
import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { IUser } from "@/types/auth.types";
import { IRecommendationResponse } from '@/types/recommendation.types';
import { underline } from 'nativewind/dist/metro/picocolors';

export interface UserState {
  selectedDate: string;
  user: IUser | undefined;
  DateOpen: boolean;
  IsAuth: boolean;
  dailyWeight: number;
  dailyHeight: number;
}

const defaultState: UserState = {
  selectedDate: format(new Date(), 'yyyy-MM-dd'),
  user: undefined,
  DateOpen: false,
  IsAuth: false,
  dailyWeight: 70,
  dailyHeight: 170,
}

export const setDate = createAction<string>("SET_DATE");
export const setDailyWeight = createAction<number>("SET_DAILY_WEIGHT");
export const setDailyHeight = createAction<number>("SET_DAILY_HEIGHT");
export const setUser = createAction<IUser | undefined>("SET_USER");
export const setIsAuth = createAction<boolean>("SET_IS_AUTH");
export const setOpenDateModal = createAction<boolean>("SET_OPEN_DATE_MODAL");

export const UserReducer = createReducer(defaultState, (builder) => {
  builder
    .addCase(setDate, (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    })
    .addCase(setDailyWeight, (state, action: PayloadAction<number>) => {
      state.dailyWeight = action.payload;
    })
    .addCase(setDailyHeight, (state, action: PayloadAction<number>) => {
      state.dailyHeight = action.payload;
    })
    .addCase(setOpenDateModal, (state, action: PayloadAction<boolean>) => {
      state.DateOpen = action.payload;
    })
    .addCase(setIsAuth, (state, action: PayloadAction<boolean>) => {
      state.IsAuth = action.payload;
    })
    .addCase(setUser, (state, action: PayloadAction<IUser | undefined>) => {
      state.user = action.payload;
    })
});