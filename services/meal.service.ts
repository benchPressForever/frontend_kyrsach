import { axiosWithAuth } from "@/api/interceptors"
import { IMealGetResponse, IMealResponse, TypeMealFormCreate, TypeMealFormUpdate } from "@/types/meal.types"


class MealService{

    BASE_URL : string = "/meal"

    async getById(id : string){
        const response = await axiosWithAuth.get<IMealResponse>(`${this.BASE_URL}/${id}`)
        return response.data
    }

    async getAllByDate(date : Date){
        const response = await axiosWithAuth.get<IMealGetResponse[]>(this.BASE_URL,{params:{date}})
        return response.data
    }

    async create(data : TypeMealFormCreate){
        console.log(data)
        const response = await axiosWithAuth.post<IMealResponse>(this.BASE_URL,data)
        return response.data
    }

    async update(id: string , data : TypeMealFormUpdate){
        const response = await axiosWithAuth.put<IMealResponse>(`${this.BASE_URL}/${id}`,data)
        return response.data
    }

    async delete(id : string){
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }
}

export const mealService = new MealService();