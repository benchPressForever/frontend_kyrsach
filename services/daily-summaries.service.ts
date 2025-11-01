import { TypeDailySummariesCreate, TypeDailySummariesUpdate } from "@/types/daily-summaries.types";
import { axiosWithAuth } from "@/api/interceptors";

class DailySummariesService {

    BASE_URL :string = '/daily-summaries'

    async create(data : TypeDailySummariesCreate) {
        const response = await axiosWithAuth.post(this.BASE_URL, data)
        return response.data
    }

    async getByDate(date : Date){
        const response = await axiosWithAuth.get(`${this.BASE_URL}/byDate`,{params: {date}})
        return response.data
    }

    async getAll(){
        const response = await axiosWithAuth.get(this.BASE_URL)
        return response.data
    }

    async delete(id : string){
        const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
        return response.data
    }

    async update(id:string,data : TypeDailySummariesUpdate){
        const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`,data)
        return response.data
    }

}

export const dailySummariesService = new DailySummariesService();