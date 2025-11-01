import { IBase } from "./root.types";

export interface IFoodResponse extends IBase{
    name           :string 
    caloriesPer100 :number 
    proteinPer100  :number 
    fatPer100      :number 
    carbsPer100    :number 
}

export type TypeFoodFormState = Partial<Omit<IFoodResponse,"createdAt" | "updatedAt" | "id">>