// create-payment.dto.ts
export class CreatePaymentDto {
    bookingId: number;
    amount: number;
    method: string; // VD: "online", "credit_card", "paypal"
}

// update-payment.dto.ts
export class UpdatePaymentDto {
    amount?: number;
    method?: string;
    status?: string;
    paidAt?: Date;
}
