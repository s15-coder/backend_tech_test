import UserBase from "./user-base";

export default interface LoginResponse {
    accessToken: string;
    user: UserBase
}