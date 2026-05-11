export interface ILoginForm {
	email: string
	password: string
}

export interface IRegisterForm extends ILoginForm{
	name: string
	age:number
	gender:EnumUserGender
}


export enum EnumUserGender {
	male = "male",
	female = "female"
}


export interface IUser {
	id: number
	name: string
	email: string
    age : number,
	gender:EnumUserGender
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
