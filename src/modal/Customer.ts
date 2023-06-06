import { Coupon } from './Coupon';

export class Customer {
    coupons?: Coupon[];
    email: string;
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
}