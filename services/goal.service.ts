import { axiosWithAuth } from "@/api/interceptors"
import {
  IGoalResponse,
  TypeGoalCreateFormState,
  TypeGoalUpdateFormState,
} from '@/types/goal.types';


class GoalService{

  BASE_URL : string = "/goal"

  async get(){
    const response = await axiosWithAuth.get<IGoalResponse>(this.BASE_URL)
    return response.data
  }

  async create(data : TypeGoalCreateFormState){
    console.log(data)
    const response = await axiosWithAuth.post<IGoalResponse>(this.BASE_URL,data)
    return response.data
  }

  async update(data : TypeGoalUpdateFormState){
    const response = await axiosWithAuth.put<IGoalResponse>(this.BASE_URL,data)
    return response.data
  }

  async recalculate(data : TypeGoalCreateFormState){
    const response = await axiosWithAuth.put<IGoalResponse>(`${this.BASE_URL}/recalculate`,data)
    return response.data
  }

  async delete(){
    const response = await axiosWithAuth.delete(this.BASE_URL)
    return response.data
  }
}

export const goalService = new GoalService();