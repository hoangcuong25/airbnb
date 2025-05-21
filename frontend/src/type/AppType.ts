export { };

declare global {
    type UserType = {
        id: number;
        name: string;
        email: string;
        avatar: string;
        age: number;
        gender: string;
        dob: string;
        address: string;
        phone: string;
        isVerified: boolean;
        role: string;
        createdAt?: string;
        updatedAt?: string;
        createdBy?: string;
        updatedBy?: string;
    }
}