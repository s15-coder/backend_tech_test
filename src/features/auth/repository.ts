import User from "../../types/user";


export default class AuthRespository {

    private db: MockDB;

    constructor() {
        this.db = new MockDB();
    }


    async register(email: string, password: string): Promise<User> {
        const user: User = {
            id: Math.floor(Math.random() * 1000),
            email,
            password
        };
        return this.db.create(user);
    }

}
class MockDB {
    create(user: User): Promise<User> {
        return new Promise((resolve) => {
            resolve(user);
        });
    }

}
