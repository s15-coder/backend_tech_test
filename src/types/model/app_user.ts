
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class AppUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 60, nullable: false })
    name!: string;

    @Column({ length: 60, nullable: false })
    email!: string;

    @Column({ length: 20, nullable: false })
    phone!: string;

    @Column({ length: 256, nullable: false })
    password!: string;

    @Column({ type: 'timestamp', nullable: false, name: 'created_at' })
    createdAt!: Date;

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            createdAt: this.createdAt,
        };
    }
}