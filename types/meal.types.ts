import { IMealFoodResponse } from "./meal-food.types";
import { IBase } from "./root.types";

export interface IMealResponse extends IBase {
    name : string,
    timeMeal : Date,
    notes: string,

    calories : number,
    protein  : number,
    fat      : number,
    carbs    : number,
}

export interface IMealGetResponse extends IMealResponse{
    mealFoods : Array<IMealFoodResponse>
}



export type TypeMealFormCreate = {
    name: string;
    time: Date;
    notes: string;
    dailyId:string;
}


export type TypeMealFormUpdate = Partial<Omit<TypeMealFormCreate,"timeMeal">>