import "./updateCoupon.css";
import { Typography, TextField, Button, ButtonGroup, InputAdornment } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import jwtAxios from '../../../util/JWTaxios';
import globals from "../../../util/global";
import notify from "../../../util/notify";
import advNotify, { ErrMsg } from '../../../util/notify_advanced';
import { Coupon } from "../../../modal/Coupon";
import { updateCoupon } from "../../../redux/couponState";


function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<Coupon>();
    const location = useLocation();
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const {couponId} = location.state as any;
    const navigate = useNavigate();
    // const [couponAdded, setCouponAdded] = useState("");




    useEffect(()=>{
        setCoupon(store.getState().couponState.coupon.find(item=>couponId == item.id));
    },[couponId]);



    // useEffect(() => {
    //     // fetch the coupon data by its id
    //     jwtAxios.get(globals.company.getOneCompanyCoupon + couponId)
    //     .then(response => {
    //         setCoupon(response.data);
    //         console.log(globals.company.getOneCompanyCoupon + couponId);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }, [couponId]);


    // useEffect(() => {
    //     store.subscribe(()=> {
    //         setCouponAdded();
    //     });
    // });


    
    

    const send = ()=> {
        console.log(coupon);
        jwtAxios.put(globals.company.updateCoupon,coupon)
        .then(response => {
            if (response.status<300) {
                notify.success("עודכן בהצלחה "+ coupon.title+  " קופון");
                navigate("/company/allCoupons");
                store.dispatch(updateCoupon(coupon)); 
            } else {
                notify.error("בעיה בעדכון קופון");
            }
        })
        .catch(err=>{
            notify.error("בעיה בעדכון קופון");
            console.error(err.data);
        })
    };


        const handlePriceChange = (e: SyntheticEvent) => {
            const inputVal = (e.target as HTMLInputElement).value;
            const newCoupon = { ...coupon };
            // limit the number of digits in the price field to 4
            if (inputVal.length <= 4) {
                newCoupon.price = Number(inputVal);
                setCoupon(newCoupon);
            } else {
                // display an error message when the user inputs more than 4 digits
                advNotify.error("אפשר להכניס מחיר מקסימלי של 9999 ש׳׳ח");
            }
        };
        
        const handleAmountChange = (e: SyntheticEvent) => {
            const newCoupon = { ...coupon };
            newCoupon.amount = Number((e.target as HTMLInputElement).value);
            setCoupon(newCoupon);
        };
        
        const handleEndDateChange = (e: SyntheticEvent) => {
            const newCoupon = { ...coupon };
            newCoupon.end_date = (e.target as HTMLInputElement).value;
            setCoupon(newCoupon);
        };



    if (!coupon) {
        return <div>Loading...</div>;
    }



    return (
        <div className="updateCoupon">
			<h1>עדכון קופון</h1> <hr />
            <div className="SolidBox" style={{width:"370px"}}>
        <form onSubmit={handleSubmit(send)}>
        <TextField name="title" label="כותרת" variant="outlined" fullWidth className="TextBox" {...register("title",{
            })} placeholder={coupon.title} value={coupon.title} disabled/>
            <br /><br />

            <TextField type={"date"} name="end_date" label="תוקף קופון" variant="outlined" fullWidth className="TextBox" {...register("end_date",{
            })} placeholder={coupon.end_date} value={coupon.end_date} onChange={handleEndDateChange}/>
            <br /><br />
            {errors.end_date && <span>{errors.end_date.message}</span>}

            <TextField type={"number"} name="amount" label="כמות" variant="outlined" fullWidth inputProps={{ maxLength: 12 }} className="TextBox" {...register("amount",{
            })} value={coupon.amount} onChange={handleAmountChange}/>
            {errors.amount && <span>{errors.amount.message}</span>}
            <br /><br />
            
            <TextField type={"number"} name="price" label="מחיר" variant="outlined" fullWidth className="TextBox" {...register("price",{
                min: {
                    value: 1,
                    message: "המחיר לא יכול להיות פחות מ-1 ש׳׳ח",
                },
                max: {
                    value: 9999,
                    message: "המחיר לא יכול להיות גבוה יותר מ-9999",
                },
            })} value={coupon.price} onChange={handlePriceChange}/>
            {errors.price && <span>{errors.price.message}</span>}
            <br /><br />
            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">עדכן קופון</Button>
            </ButtonGroup>
            <br />
            </form>
            </div>
        </div>
    );
}

export default UpdateCoupon;
