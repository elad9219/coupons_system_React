import "./addCoupon.css";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import jwtAxios from '../../../util/JWTaxios';
import globals from '../../../util/global';
import notify from '../../../util/notify';
import { store } from "../../../redux/store";
import { Coupon } from '../../../modal/Coupon';
import { addCoupon } from "../../../redux/couponState";
import advNotify from "../../../util/notify_advanced";
import { useEffect, useState } from "react";
import { CouponCategory } from "../../../modal/CouponCategory";

function AddCoupon(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<Coupon>();
    const navigate = useNavigate();
    const [category, setCategory] = useState("");


    useEffect(() => {
        if (store.getState().authState.userType!="COMPANY") {
            advNotify.error("Please login...");
            navigate("/login");
        }
    },[]);

    const changeHandler = (event:SelectChangeEvent) => {
        setCategory(event.target.value as string);
    } 

    const send = (newCoupon: Coupon)=> {
        console.log(newCoupon);   
        jwtAxios.post(globals.company.addCoupon,newCoupon)
        .then(response => {
            if (response.status<300) {
                notify.success("קופון " + newCoupon.title + " נוסף בהצלחה");
                navigate("/");
                store.dispatch(addCoupon(newCoupon)); 
            } 
        })
        .catch(err=>{
            notify.error("בעיה בהוספת קופון");
            console.error(err.data);
        })
    };



    return (
        <div className="addCoupon">
			<h1>הוספת קופון</h1> <hr />
            <div className="SolidBox" style={{width:"370px"}}>
        <form onSubmit={handleSubmit(send)}>
        <InputLabel id="category" style={{marginLeft: "10px"}}>קטגוריה</InputLabel>
            <Select labelId="category" label="סוג משתמש" value={category} fullWidth {...register("category",{
                required: {
                value: true,
                message: 'לא הוקש סוג משתמש'
            }
            })}
                onChange={changeHandler}
            >
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
            <span>{errors.category?.message}</span>
            <br /><br />
            <TextField name="title" label="כותרת" variant="outlined" fullWidth className="TextBox" {...register("title",{
                required: {
                    value: true,
                    message: 'לא הוכנסה כותרת'
                }
            })}/>
            <br />
            {errors.title && <span>{errors.title.message}</span>}
            <br />
            <TextField name="description" label="תיאור" variant="outlined" fullWidth className="TextBox" {...register("description",{
            })}/>
            <br />
            {errors.description && <span>{errors.description.message}</span>}
            <br />
            <TextField type={"date"} name="start_date" label="תאריך תחילת קופון" variant="outlined" fullWidth className="TextBox" {...register("start_date",{
                required: {
                    value: true,
                    message: 'לא הוכנס תאריך'
                }
            })}/>
            <br />
            {errors.start_date && <span>{errors.start_date.message}</span>}
            <br />
            <TextField type={"date"} name="end_date" label="תוקף קופון" variant="outlined" fullWidth className="TextBox" {...register("end_date",{
                required: {
                    value: true,
                    message: 'לא הוכנס תאריך'
                }
            })}/>
            <br /><br />
            {errors.end_date && <span>{errors.end_date.message}</span>}
            <TextField type={"number"} name="amount" label="כמות" variant="outlined" fullWidth className="TextBox" {...register("amount",{
                required: {
                    value: true,
                    message: 'לא הוכנסה כמות לקופון זה'
                }
            })}/>
            {errors.amount && <span>{errors.amount.message}</span>}
            <br /><br />
            <TextField type={"number"} name="price" label="מחיר" variant="outlined" fullWidth className="TextBox" {...register("price",{
                required: {
                    value: true,
                    message: 'לא הוכנס מחיר לקופון'
                },
                min: {
                    value: 1,
                    message: "המחיר לא יכול להיות פחות מ-1 ש׳׳ח",
                },
                max: {
                    value: 9999,
                    message: "המחיר לא יכול להיות גבוה יותר מ-9999",
                },
            })}/>
            {errors.price && <span>{errors.price.message}</span>}
            <br /><br />
            <TextField name="image" label="תמונה" variant="outlined" fullWidth className="TextBox" {...register("image",{
                required: {
                    value: true,
                    message: 'לא הוכנסה תמונה לקופון'
                }
            })}/>
            <br />
            {errors.image && <span>{errors.image.message}</span>}
            <br />
            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">הוספת קופון</Button>
            </ButtonGroup>
            <br />
            </form>
            </div>
        </div>
    );
}

export default AddCoupon;
