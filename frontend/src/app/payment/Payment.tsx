'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@radix-ui/react-dropdown-menu';
import { RadioGroupItem } from '@radix-ui/react-radio-group';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');
    const router = useRouter();

    const handlePayment = () => {
        if (paymentMethod === 'cash') {
            // Handle cash payment
            alert('Vui lòng thanh toán tiền mặt khi nhận phòng');
            router.push('/');
        } else {
            // Handle online payment
            alert('Chuyển hướng đến cổng thanh toán online...');
            // TODO: Implement online payment gateway
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

                {/* Payment Method Selection */}
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>
                    <RadioGroup
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as 'cash' | 'online')}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="flex items-center">
                                <span className="ml-2">Thanh toán tiền mặt</span>
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="online" />
                            <Label htmlFor="online" className="flex items-center">
                                <span className="ml-2">Thanh toán online</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Payment Button */}
                <Button
                    onClick={handlePayment}
                    className="w-full"
                >
                    {paymentMethod === 'cash' ? 'Xác nhận thanh toán tiền mặt' : 'Thanh toán online'}
                </Button>
            </Card>
        </div>
    );
};

export default Payment;