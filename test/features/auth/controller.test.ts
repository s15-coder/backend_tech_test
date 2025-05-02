import { Request, Response } from 'express';
import AuthService from '../../../src/features/auth/service';
import AuthRepository from '../../../src/features/auth/repository';
import PasswordEncryptionRepository from '../../../src/repository/password-encryption';
import AuthController from '../../../src/features/auth/controller';
import AppUser from '../../../src/types/model/app_user.entity';
import LoginResponse from '../../../src/types/dto/login-response';

// Mock the dependencies
jest.mock('../../../src/features/auth/service');
jest.mock('../../../src/features/auth/repository');
jest.mock('../../../src/repository/password-encryption');

const mockAuthRepository = new AuthRepository() as jest.Mocked<AuthRepository>;
const mockPasswordEncryptionRepository = new PasswordEncryptionRepository() as jest.Mocked<PasswordEncryptionRepository>;
const mockAuthService = new AuthService(mockAuthRepository, mockPasswordEncryptionRepository) as jest.Mocked<AuthService>;

describe('AuthController', () => {
    let authController: AuthController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        // Create a new instance of AuthController before each test
        authController = new AuthController(mockAuthService);

        // Mock the request and response objects
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockRequest = {};
        mockResponse = {
            status: mockStatus,
            json: mockJson,
        };

        // Reset the mock AuthService before each test
        mockAuthService.signUp.mockReset();
        mockAuthService.login.mockReset();
    });

    describe('signUp', () => {
        it('should call AuthService.signUp with the correct parameters', async () => {
            const signUpData = { email: 'test@example.com', password: 'password123', name: 'Test User', phone: '123-456-7890' };
            mockRequest.body = signUpData;

            await authController.signUp(mockRequest as Request, mockResponse as Response);

            expect(mockAuthService.signUp).toHaveBeenCalledWith(
                signUpData.email,
                signUpData.password,
                signUpData.name,
                signUpData.phone
            );
        });

        it('should respond with 201 and the created user if signup is successful', async () => {
            const signUpData = { email: 'test@example.com', password: 'password123', name: 'Test User', phone: '123-456-7890' };
            const mockUser = {
                id: 'someId',
                email: 'test@example.com',
                name: 'Test User',
                phone: '123-456-7890',
                password: 'hashedPassword',
                createdAt: new Date(),
                appTransactions: [],
            } as unknown as AppUser;
            mockAuthService.signUp.mockResolvedValue(mockUser);
            mockRequest.body = signUpData;

            await authController.signUp(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(mockUser);
        });

        it('should respond with 400 and an error message if the user already exists', async () => {
            const signUpData = { email: 'test@example.com', password: 'password123', name: 'Test User', phone: '123-456-7890' };
            mockAuthService.signUp.mockResolvedValue(undefined);
            mockRequest.body = signUpData;

            await authController.signUp(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ message: 'User already exists' });
        });

        it('should respond with 500 and an error message if AuthService.signUp throws an error', async () => {
            const signUpData = { email: 'test@example.com', password: 'password123', name: 'Test User', phone: '123-456-7890' };
            mockAuthService.signUp.mockRejectedValue(new Error('Database error'));
            mockRequest.body = signUpData;

            await authController.signUp(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });

    describe('login', () => {
        it('should call AuthService.login with the correct parameters', async () => {
            const loginData = { email: 'test@example.com', password: 'password123' };
            mockRequest.body = loginData;

            await authController.login(mockRequest as Request, mockResponse as Response);

            expect(mockAuthService.login).toHaveBeenCalledWith(loginData.email, loginData.password);
        });

        it('should respond with 200 and the login response if login is successful', async () => {
            const loginData = { email: 'test@example.com', password: 'password123' };
            const mockLoginResponse = {
                token: 'someToken',
                user: {
                    id: 'someId',
                    email: 'test@example.com'
                }
            } as unknown as LoginResponse;
            mockAuthService.login.mockResolvedValue(mockLoginResponse);
            mockRequest.body = loginData;

            await authController.login(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(mockLoginResponse);
        });

        it('should respond with 401 and an error message if login fails', async () => {
            const loginData = { email: 'test@example.com', password: 'wrongpassword' };
            mockAuthService.login.mockResolvedValue(undefined);
            mockRequest.body = loginData;

            await authController.login(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(401);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid email or password' });
        });

        it('should respond with 500 and an error message if AuthService.login throws an error', async () => {
            const loginData = { email: 'test@example.com', password: 'password123' };
            mockAuthService.login.mockRejectedValue(new Error('Authentication error'));
            mockRequest.body = loginData;

            await authController.login(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });
});