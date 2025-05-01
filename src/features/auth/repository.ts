import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import AppUser from "../../types/model/app_user";

export default class AuthRespository {
    appUserRepository: Repository<AppUser>

    constructor() {
        this.appUserRepository = AppDataSource.getRepository(AppUser)
    }


    signUp = async (
        email: string,
        name: string,
        plainPassword: string,
        phone: string,
    ): Promise<AppUser> => {
        const newUser = new AppUser();
        newUser.name = name;
        newUser.email = email;
        newUser.password = plainPassword;
        newUser.phone = phone;
        newUser.createdAt = new Date();
        const savedUser = await this.appUserRepository.save(newUser);
        return savedUser;
    }

    findByEmail = async (email: string): Promise<AppUser | null> => {
        const user = await this.appUserRepository.findOne({
            where: {
                email: email
            }
        });
        return user;
    }
}