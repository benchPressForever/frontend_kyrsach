import { axiosWithAuth } from "@/api/interceptors"
import { IFoodResponse, TypeFoodFormState } from "@/types/food.types"
import { IRecommendationResponse, TypeRecommendationFormState } from '@/types/recommendation.types';


class RecommendationService{

  BASE_URL :string = '/recommendation'

  async getAll(){
    const response = await axiosWithAuth.get<IRecommendationResponse[]>(this.BASE_URL)
    return response.data
  }

  async getById(id : string){
    const response = await axiosWithAuth.get<IRecommendationResponse>(`${this.BASE_URL}/${id}`)
    return response.data
  }

  async create(data : TypeRecommendationFormState){
    const response = await axiosWithAuth.post<IRecommendationResponse>(this.BASE_URL,data)
    return response.data
  }

  async update(id : string,data : Partial<TypeRecommendationFormState>){
    const response = await axiosWithAuth.put<IRecommendationResponse>(`${this.BASE_URL}/${id}`,data)
    return response.data
  }

  async delete(id : string){
    const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
    return response.data
  }
}

export const recommendationService = new RecommendationService()