import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ default: "https://res.cloudinary.com/dtaawt3ej/image/upload/v1706880635/default-avatar.jpg" })
    avatar: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column()
    resetOtp: string;

    @Column()
    resetOtpExpires: Date;

    @Column()
    verificationOtp: string;

    @Column()
    verificationOtpExpires: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
