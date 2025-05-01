import { PasswordEncryptionRepository } from "../../repository/password-encryption";
import AppUser from "../../types/model/app_user";
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

}

