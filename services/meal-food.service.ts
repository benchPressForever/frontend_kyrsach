import { axiosWithAuth } from "@/api/interceptors";
import { TypeMealFoodFormCreate, TypeMealFoodFormUpdate } from "@/types/meal-food.types";
import { IMealGetResponse, IMealResponse, TypeMealFormUpdate } from "@/types/meal.types";

class MealFoodService{
    BASE_URL: string = "/mealFood"

    async create(data : TypeMealFoodFormCreate){
        const response = await axiosWithAuth.post<IMealGetResponse>(this.BASE_URL,data)
        return response.data
    }

    async update(id : string , data : TypeMealFoodFormUpdate){
        const response = await axiosWithAuth.put<IMealGetResponse>(`${this.BASE_URL}/${id}`,data)
        return response.data
    }

    async delete(id : string){
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }
}

export const mealFoodService = new MealFoodService();