import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit"
import { IDailySummariesResponse } from '@/types/daily-summaries.types';

export interface DailyState {
  daily : IDailySummariesResponse | undefined;
}

const defaultState : DailyState  = {
    daily : undefined
}

export const setDaily = createAction<IDailySummariesResponse>("SET_DAILY")


export const DailyReducer = createReducer(defaultState,(builder) => {
    builder
    .addCase(setDaily,(state,action: PayloadAction<IDailySummariesResponse>) => {
        state.daily = action.payload
    })
})


