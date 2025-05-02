import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import AppUser from './app_user.entity';

@Entity()
export default class AppTransaction {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => AppUser, (appUser) => appUser.appTransactions)
    @JoinColumn({ name: 'user_id' })
    appUser!: AppUser;

    @Column({ type: 'integer', nullable: false })
    amount!: number;

    @Column({ type: 'timestamp', nullable: false, name: 'transaction_date' })
    transactionDate!: Date;

    @Column({ type: 'varchar', length: 100, nullable: false })
    description!: string;

}