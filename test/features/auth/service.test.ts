import AuthService from "../../../src/features/auth/service";
import AuthRespository from "../../../src/features/auth/repository";
import PasswordEncryptionRepository from "../../../src/repository/password-encryption";
import AppUser from "../../../src/types/model/app_user.entity";

jest.mock("../../../src/features/auth/repository");
jest.mock("../../../src/repository/password-encryption");

describe("AuthService", () => {
    let authService: AuthService;
    let authRepositoryMock: jest.Mocked<AuthRespository>;
    let passwordEncryptionRepositoryMock: jest.Mocked<PasswordEncryptionRepository>;

    beforeEach(() => {
        authRepositoryMock = new AuthRespository() as jest.Mocked<AuthRespository>;
        passwordEncryptionRepositoryMock = new PasswordEncryptionRepository() as jest.Mocked<PasswordEncryptionRepository>;

        authService = new AuthService(authRepositoryMock, passwordEncryptionRepositoryMock);

        authRepositoryMock.findByEmail = jest.fn();
        authRepositoryMock.signUp = jest.fn();
        passwordEncryptionRepositoryMock.encryptPassword = jest.fn();
        passwordEncryptionRepositoryMock.comparePassword = jest.fn();
    });

    describe("signUp", () => {

        it("should return undefined if user already exists", async () => {

            authRepositoryMock.findByEmail.mockResolvedValue({} as AppUser);

            const result = await authService.signUp("test@example.com", "password", "Test User", "123456789");

            expect(result).toBeUndefined();
            expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith("test@example.com");
        });

        it("should create a new user if user does not exist", async () => {
            authRepositoryMock.findByEmail.mockResolvedValue(null);
            passwordEncryptionRepositoryMock.encryptPassword.mockResolvedValue("hashedPassword");
            const mockUser = { id: 1, email: "test@example.com" } as AppUser;
            authRepositoryMock.signUp.mockResolvedValue(mockUser);

            const result = await authService.signUp("test@example.com", "password", "Test User", "123456789");

            expect(result).toEqual(mockUser);
            expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith("test@example.com");
            expect(passwordEncryptionRepositoryMock.encryptPassword).toHaveBeenCalledWith("password");
            expect(authRepositoryMock.signUp).toHaveBeenCalledWith("test@example.com", "Test User", "hashedPassword", "123456789");
        });

        it("should throw an error if an exception occurs", async () => {
            authRepositoryMock.findByEmail.mockRejectedValue(new Error("Database error"));

            await expect(authService.signUp("test@example.com", "password", "Test User", "123456789"))
                .rejects.toThrow("Database error");
        });
    });

    describe("login", () => {
        it("should return undefined if user does not exist", async () => {
            authRepositoryMock.findByEmail.mockResolvedValue(null);

            const result = await authService.login("test@example.com", "password");

            expect(result).toBeUndefined();
            expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith("test@example.com");
        });

        it("should return undefined if password is invalid", async () => {
            const mockUser = { email: "test@example.com", password: "hashedPassword" } as AppUser;
            authRepositoryMock.findByEmail.mockResolvedValue(mockUser);
            passwordEncryptionRepositoryMock.comparePassword.mockResolvedValue(false);

            const result = await authService.login("test@example.com", "password");

            expect(result).toBeUndefined();
            expect(passwordEncryptionRepositoryMock.comparePassword).toHaveBeenCalledWith("password", "hashedPassword");
        });

        it("should return a LoginResponse if credentials are valid", async () => {
            const mockUser = { email: "test@example.com", password: "hashedPassword", name: "Test User", phone: "123456789", toJSON: jest.fn() } as unknown as AppUser;
            authRepositoryMock.findByEmail.mockResolvedValue(mockUser);
            passwordEncryptionRepositoryMock.comparePassword.mockResolvedValue(true);
            authRepositoryMock.generateToken.mockReturnValue('mockToken');

            const result = await authService.login("test@example.com", "password");

            expect(result).toEqual({
                accessToken: "mockToken",
                user: {
                    email: "test@example.com",
                    phone: "123456789",
                    name: "Test User",
                },
            });
            expect(authRepositoryMock.generateToken).toHaveBeenCalledWith(mockUser.toJSON());
        });

        it("should throw an error if an exception occurs", async () => {
            authRepositoryMock.findByEmail.mockRejectedValue(new Error("Database error"));

            await expect(authService.login("test@example.com", "password"))
                .rejects.toThrow("Database error");
        });
    });
});