import PasswordEncryptionRepository from "../../repository/password-encryption";
import LoginResponse from "../../types/dto/login-response";
import AppUser from "../../types/model/app_user.entity";
import AuthRespository from "./repository";

export default class AuthService {

    constructor(
        private authRespository: AuthRespository,
        private passwordEncryptionRepository: PasswordEncryptionRepository
    ) {
    }

    async signUp(email: string, password: string, name: string, phone: string): Promise<AppUser | undefined> {
        try {
            // Check if the user already exists
            const existingUser = await this.authRespository.findByEmail(email);
            if (existingUser) {
                return undefined;
            }
            const hashedPassword = await this.passwordEncryptionRepository
                .encryptPassword(password);
            const user = await this.authRespository
                .signUp(
                    email,
                    name,
                    hashedPassword,
                    phone,
                );

            return user;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error signing up:', error.message);
            } else {
                console.error('Unknown error signing up:', error);
            }
            throw error;
        }
    }


    async login(email: string, password: string): Promise<LoginResponse | undefined> {
        try {
            const user = await this.authRespository.findByEmail(email);
            if (!user) {
                return undefined;
            }
            const isPasswordValid = await this.passwordEncryptionRepository
                .comparePassword(password, user.password);
            if (!isPasswordValid) {
                return undefined;
            }
            const token = await this.authRespository.generateToken(user.toJSON());
            const response: LoginResponse = {
                accessToken: token,
                user: {
                    email: user.email,
                    phone: user.phone,
                    name: user.name,

                },
            }
            return response;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error logging in:', error.message);
            } else {
                console.error('Unknown error logging in:', error);
            }
            throw error;
        }
    }
}

