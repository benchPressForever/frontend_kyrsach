import { axiosWithAuth } from "@/api/interceptors"
import { IFoodResponse, TypeFoodFormState } from "@/types/food.types"


class FoodService{

    BASE_URL :string = '/food'


    async getAllByName(name : string , page : number , limit : number){
        const response = await axiosWithAuth.get<IFoodResponse[]>(this.BASE_URL,{
                params: {
                    name,
                    page,
                    limit
                }
        })

        return response.data
    }

    async getById(id : string){
        const response = await axiosWithAuth.get<IFoodResponse>(`${this.BASE_URL}/${id}`)
        return response.data
    }

    async create(data : TypeFoodFormState){
        const response = await axiosWithAuth.post<IFoodResponse>(this.BASE_URL,data)
        return response.data
    }

    async update(id : string,data : TypeFoodFormState){
        const response = await axiosWithAuth.put<IFoodResponse>(`${this.BASE_URL}/${id}`,data)
        return response.data
    }

    async delete(id : string){
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }
}

export const foodService = new FoodService()