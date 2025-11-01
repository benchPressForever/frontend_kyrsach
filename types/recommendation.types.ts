import { IBase } from "./root.types";

export interface IRecommendationResponse extends IBase{
  text           :string,
  title           :string
}

export type TypeRecommendationFormState = Partial<Omit<IRecommendationResponse,"createdAt" | "updatedAt" | "id">>