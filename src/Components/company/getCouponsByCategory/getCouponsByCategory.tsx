import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../modal/Coupon";
import { CouponCategory } from "../../../modal/CouponCategory";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import notify from "../../../util/notify";
import advNotify, { ErrMsg } from "../../../util/notify_advanced";
import SingleCoupon from "../singleCoupon/singleCoupon";
import "./getCouponsByCategory.css";
import { SelectChangeEvent } from "@mui/material";



function GetCouponsByCategory(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [category, setCategory] = useState<CouponCategory>(CouponCategory.ALL);

    useEffect(() => {
        if (store.getState().authState.userType!="COMPANY") {
            advNotify.error("Please login...");
            navigate("/login");
        }
        getCouponsByCategory(category);
    },[category]);

    const getCouponsByCategory = async (category: CouponCategory | CouponCategory.ALL) => {
        try {
            let response;
            if (category === CouponCategory.ALL) {
                response = await jwtAxios.get<Coupon[]>(globals.company.getAllCoupons);
            } else {
                response = await jwtAxios.get<Coupon[]>(globals.company.getCouponByCategory + category);
            }
            setCoupons(response.data);
            if (response.data.length === 0) {
                notify.info("אין כעת קופונים בקטגוריה זו");
            }
        } catch (error) {
            notify.error("אין כעת קופונים בקטגוריה זו");
        }
    }


    const handleSelectChange = (event: SelectChangeEvent<CouponCategory>) => {
        const value = event.target.value;
        if (value === CouponCategory.ALL) {
            setCategory(CouponCategory.ALL);
        } else {
            setCategory(value as CouponCategory);
        }
    };

    return (
        <div className="getAllCompanyCoupons">
            <div className="solid">
                <h1>הקופונים של החברה לפי קטגוריה</h1>
                <hr />
        <FormControl fullWidth sx={{ display: "flex" }}>
        <InputLabel id="category">קטגוריה</InputLabel>
        <Select labelId="category" label="סוג משתמש" value={category} sx={{ maxWidth: "250px" }} onChange={handleSelectChange}>
            <MenuItem value={CouponCategory.ALL} dir="rtl">כל הקטגוריות</MenuItem>
            <MenuItem value={CouponCategory.FOOD} dir="rtl">אוכל</MenuItem>
            <MenuItem value={CouponCategory.VACATION} dir="rtl">חופשה</MenuItem>
            <MenuItem value={CouponCategory.HOTELS} dir="rtl">מלונות</MenuItem>
            <MenuItem value={CouponCategory.ELECTRICITY} dir="rtl">מוצרי חשמל</MenuItem>
            <MenuItem value={CouponCategory.RESTAURANT} dir="rtl">מסעדות</MenuItem>
            <MenuItem value={CouponCategory.SPA} dir="rtl">ספא</MenuItem>
            <MenuItem value={CouponCategory.ATTRACTIONS} dir="rtl">אטרקציות</MenuItem>
            <MenuItem value={CouponCategory.CLOTHING} dir="rtl">ביגוד</MenuItem>
            <MenuItem value={CouponCategory.BOWLING} dir="rtl">באולינג</MenuItem>
            <MenuItem value={CouponCategory.OTHER}dir="rtl">אחר</MenuItem>
            </Select>
            </FormControl>
            {coupons.map(item=><SingleCoupon key={item.id} coupon={item} updateCoupon={function (): void {
                throw new Error("Function not implemented.");
            } } couponPurchased={false}/>)}
            </div>
        </div>
    );
}

export default GetCouponsByCategory;
