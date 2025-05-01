import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
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
    
    generateToken = (payload: object): string => {
        return jwt.sign(payload, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
    }

    verifyToken = (token: string): object | string | null => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            return decoded;
        } catch (error) {
            return null;
        }
    }
}