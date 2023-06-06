export class Coupon {
    id: number;
    companyId: number;
    category: string;
    title: string;
    description?: string
    start_date: string;
    end_date: string;
    amount: number;
    price: number;
    image?: string;
}
