import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import "./getCustomerCouponsByMaxPrice.css";
import { Coupon } from "../../../modal/Coupon";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify from "../../../util/notify";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { ThemeProvider, createMuiTheme } from "@mui/material";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";

function GetCustomerCouponsByMaxPrice(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(4000);

    useEffect(() => {
        if (store.getState().authState.userType!="CUSTOMER") {
            advNotify.error("Please login...");
            navigate("/login");
        } else {
            jwtAxios.get<Coupon[]>(`${globals.customer.getCouponsByMaxPrice}/${maxPrice}`)
                .then((response) => {
                    setCoupons(response.data);
                })
        }
    }, [maxPrice]);


    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setMaxPrice(newValue as number);
    };



    const marks = [
        { value: 100, label: "100₪" },
        { value: 2500, label: "2,500₪" },
        { value: 5000, label: "5,000₪" },
        { value: 7500, label: "7,500₪" },
        { value: 10000, label: "10,000₪" },
    ];

    function SliderSizes() {
        const setValue = (newValue: number) => {
        setMaxPrice(newValue);
        }
            return setValue;
    };

    
    
    return (
        <div className="getCustomerCouponsByMaxPrice">
            <div className="solid">
			<Box sx={{ width: 450, margin: "0 auto" }}>
            <p style={{fontSize:"13px"}}>מחיר מקסימלי</p>
        <Slider
            size="medium"
            aria-label="Small"
            valueLabelDisplay="auto"
            min={100}
            max={10000}
            step={100}
            marks={marks}
            value={maxPrice}
            onChange={(_, newValue) => SliderSizes()(newValue as number)}
            sx={{
                width: "100%",
            }}
            />
        </Box>
        ₪ <input type="number" placeholder="Max price" value={maxPrice} style={{width:75}} onChange={(e) => setMaxPrice(Number(e.target.value))}/>
                <hr />
                {coupons.map(item=><SingleCoupon key={item.id} coupon={item} updateCoupon={function (): void {
                    throw new Error("Function not implemented.");
                } } couponPurchased={false}/>)}
        </div>
    </div>
    );
}

export default GetCustomerCouponsByMaxPrice;
