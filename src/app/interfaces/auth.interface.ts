export interface IAuthResponse {
    ok: boolean;
    user: IUser;
    token: string;
}

export interface IOk {
    ok:boolean;
    message?:string;
}
  
export interface IUser {
    id: string;
    fullname: string;
    phone: string;
    email: string;
    avatar: string;
    role: string;
    actived: boolean;
    created_at: string;
    updated_at: string;
}

export interface IDatosActuales {
    user: IUser;
    token: string;
}