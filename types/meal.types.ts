import { IFoodResponse } from "./food.types";
import { IMealFoodResponse } from "./meal-food.types";
import { IBase } from "./root.types";

export interface IMealResponse extends IBase {
    name : string,
    timeMeal : Date,
    notes: string,

    totalCalories : number,
    totalProtein  : number,
    totalFat      : number,
    totalCarbs    : number,
}

export interface IMealGetResponse extends IMealResponse{
    mealFoods : Array<IMealFoodResponse>
}



export type TypeMealFormCreate = {
    name: string;
    timeMeal: Date;
    notes: string;
}


export type TypeMealFormUpdate = Partial<Omit<TypeMealFormCreate,"timeMeal">>