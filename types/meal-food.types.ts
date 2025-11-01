import { IFoodResponse } from "./food.types";
import { IBase } from "./root.types";

export interface IMealFoodResponse extends IBase {
    servingSize        : number,
    mealId             : string,
    foodId             : string,

    calculatedCalories : number,
    calculatedProtein  : number,
    calculatedFat      : number,
    calculatedCarbs    : number,

    food: IFoodResponse
}


export type TypeMealFoodFormCreate = {
    servingSize: number;
    mealId     : string;
    foodId     : string; 
}

export type TypeMealFoodFormUpdate = Partial<Omit<TypeMealFoodFormCreate,"mealId" | "foodId">> 
