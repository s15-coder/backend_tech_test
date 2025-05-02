
import { DataSource } from 'typeorm';
import AppUser from '../types/model/app_user.entity';
import { AppTransaction } from '../types/model/app_transaction.entity';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: [AppUser, AppTransaction],
});



const connectDB = (): Promise<void> => {

    return new Promise((resolve, reject) => {
        AppDataSource.initialize()
            .then(() => {
                console.log('Database connection established');
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    })

}

export { connectDB, AppDataSource };