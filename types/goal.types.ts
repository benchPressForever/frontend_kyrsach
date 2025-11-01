import { IBase } from "./root.types";
import { EnumUserGender } from '@/types/auth.types';

export interface IGoalResponse extends IBase{
  calories :number
  protein  :number
  fat      :number
  carbs    :number
  mealsCount   :number
  typeGoal     : TypeGoalApi
  typeActivity : TypeActivityApi
}

export type TypeGoalCreateFormState = {
  height: number;
  weight: number;
  age: number;
  mealsCount: number;
  typeGoal: TypeGoalApi;
  typeActivity: TypeActivityApi;
  gender: EnumUserGender;
}

export type TypeGoalUpdateFormState = Partial<Omit<IGoalResponse,"createdAt" | "updatedAt" | "id">>;


export enum TypeGoalApi {
  weightGain = "weightGain",
  weightLoss = "weightLoss",
  weightSupport = "weightSupport"
}

export enum TypeActivityApi {
  sedentary= "sedentary",
  light = "light",
  moderate = "moderate",
  active = "active",
  veryActive  = "veryActive"
}

export enum TypeGoalUi {
  weightGain = "Набор мышечной массы",
  weightLoss = "Снижение веса",
  weightSupport = "Поддержание текущего веса"
}

export enum TypeActivityUi {
  sedentary = "Сидячий образ жизни (офисная работа)",
  light = "Легкая активность (1-3 тренировки в неделю)",
  moderate = "Умеренная активность (3-5 тренировок в неделю)",
  active = "Высокая активность (6-7 тренировок в неделю)",
  veryActive = "Очень высокая активность (тяжелая работа + тренировки)"
}
