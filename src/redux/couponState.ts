import { Coupon } from '../modal/Coupon';

export class couponState {
    coupon : Coupon[] = [];
    singleCoupon: Coupon | null;
    singleCouponId: number | null;
}

export enum couponActionType {
    DownloadCoupons = "DownloadCoupons",
    DeleteCoupon = "DeleteCoupon",
    UpdateCoupon = "UpdateCoupon",
    AddCoupon = "AddCoupon",
    DownloadSingleCoupon = "DownloadSingleCoupon",
    GetSingleCoupon = "GetSingleCoupon",
}

export interface CouponAction {
    type : couponActionType,
    payload? : any;
}

export function downloadCoupons(coupons: Coupon[]):CouponAction {
    return {type: couponActionType.DownloadCoupons, payload: coupons};
}

export function deleteCoupon(couponId: number):CouponAction {    
    return {type : couponActionType.DeleteCoupon,payload: couponId};
}

export function updateCoupon(coupon: Coupon):CouponAction {
    return {type: couponActionType.UpdateCoupon,payload: coupon};
}

export function addCoupon(coupon: Coupon):CouponAction {
    return {type: couponActionType.AddCoupon,payload: coupon};
}

export function downloadSingleCoupon(coupon:Coupon[]):CouponAction {    
    return {type : couponActionType.DownloadSingleCoupon,payload: coupon};
}


export function getSingleCoupon(coupon: Coupon): CouponAction {
    return {type: couponActionType.GetSingleCoupon, payload: coupon};
}


export function couponReducer(currentState: couponState = new couponState, action: CouponAction): couponState {
    const newState = {...currentState};

    switch (action.type) {
        case couponActionType.DownloadCoupons: 
            newState.coupon = action.payload;
            //console.log(action.payload);    
        break;

        case couponActionType.AddCoupon: 
            //update backend
            return {
                ...currentState,
                coupon: [...currentState.coupon, action.payload]
            };
        break;

        case couponActionType.DeleteCoupon:
            newState.coupon = newState.coupon.filter(item=>item.id!=action.payload);
        break;

        case couponActionType.UpdateCoupon:
            return {
                ...currentState,
                coupon: currentState.coupon.map((c) => c.id === action.payload.id ? action.payload : c)
            };
        break;

        case couponActionType.DownloadSingleCoupon:
            const { payload } = action;
            const existingCouponIndex = newState.coupon.findIndex(c => c.id === payload.id);
            if (existingCouponIndex >= 0) {
                // If the coupon already exists in the state, update it
                newState.coupon = [
                ...newState.coupon.slice(0, existingCouponIndex),
                payload,
                ...newState.coupon.slice(existingCouponIndex + 1),
                ];
            } else {
                // If the company doesn't exist in the state, add it
                newState.coupon = [...newState.coupon, payload];
            }
        break;

        case couponActionType.GetSingleCoupon:
            const couponId = action.payload;
            const singleCoupon = newState.coupon.find((c) => c.id === couponId);
            newState.coupon = singleCoupon ? [singleCoupon] : [];
        break;
    }
    return newState;
}