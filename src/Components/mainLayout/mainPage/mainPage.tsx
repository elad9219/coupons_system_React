import "./mainPage.css";
import { useNavigate } from "react-router-dom";
import { Coupon } from '../../../modal/Coupon';
import { useEffect, useState } from "react";
import { store } from "../../../redux/store";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import jwtAxios from '../../../util/JWTaxios';
import globals from '../../../util/global';
import { downloadCoupons } from "../../../redux/couponState";
import notify from '../../../util/notify';
import { ErrMsg } from "../../../util/notify_advanced";
import AllCoupons from "../../user/allCoupons/allCoupons";

function MainPage(): JSX.Element {
    
    return (
        <div className="mainPage">
			<AllCoupons/>
        </div>
    );
}


export default MainPage;
