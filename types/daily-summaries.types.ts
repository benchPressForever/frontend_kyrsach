import { IBase } from "./root.types";


export interface IDailySummariesResponse extends IBase{
    date : Date,
    weight: number,
    height: number,
    mealsCount : number,

    calories : number,
    protein : number,
    fat : number,
    carbs : number
}

export type TypeDailySummariesCreate =  {
    weight : number;
    height : number;
    date   : Date;
}

export type TypeDailySummariesUpdate =  {
    weight : number;
    height : number;
}