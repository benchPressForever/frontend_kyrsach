import { removeFromStorage, saveTokenStorage } from './auth-token.service'
import type {ILoginForm,IRegisterForm, IAuthResponse } from '../types/auth.types'
import { axiosClassic } from '../api/interceptors'

export const authService = {
	async login(data: ILoginForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/signin`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response.data
	},


	async register(data: IRegisterForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/signup`,
			data
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response.data
	},	

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/signin/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response.data
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response.data
	}
}
