import User from "../../types/user";
import AuthRespository from "./repository";

export default class AuthService {

    constructor(private authRespository: AuthRespository) {
    }

    async register(email: string, password: string): Promise<User> {
        const user = await this.authRespository.register(email, password);
        return user;
    }

}

