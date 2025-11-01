import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit"
import { IGoalResponse } from '@/types/goal.types';

export interface GoalState {
  goal : IGoalResponse | undefined;
}

const defaultState : GoalState  = {
    goal : undefined
}

export const setGoal = createAction<IGoalResponse>("SET_GOAL")


export const GoalReducer = createReducer(defaultState,(builder) => {
    builder
    .addCase(setGoal,(state,action: PayloadAction<IGoalResponse>) => {
        state.goal = action.payload
    })
})


