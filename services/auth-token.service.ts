import * as SecureStore from 'expo-secure-store'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = SecureStore.getItem(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	SecureStore.setItem(EnumTokens.ACCESS_TOKEN, accessToken)
}

export const removeFromStorage = () => {
	SecureStore.deleteItemAsync(EnumTokens.ACCESS_TOKEN)
}
