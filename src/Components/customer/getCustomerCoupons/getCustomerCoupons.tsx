import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Coupon } from "../../../modal/Coupon";
import { CouponCategory } from "../../../modal/CouponCategory";
import { store } from "../../../redux/store";
import globals from "../../../util/global";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import "./getCustomerCoupons.css";
import { Customer } from '../../../modal/Customer';

function GetCustomerCoupons(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [category, setCategory] = useState<CouponCategory>(CouponCategory.ALL);
    const location = useLocation();
    const [customer, setCustomer] = useState<Customer | null>(null);
    

    



    useEffect(() => {
        if (store.getState().authState.userType == "CUSTOMER") {
            getCoupons();
        } if (store.getState().authState.userType == "ADMIN") {
            const {customerId} = location.state as any;
            const customer = store.getState().customerState.customer.find(item => customerId === item.id);
            setCustomer(customer);
            if (customer) {
                setCoupons(customer.coupons); // set the coupons state to the customer's coupons array
            }
        }
    }, [maxPrice, category]);


    async function getCouponsByCategoryAndPrice(category: CouponCategory, maxPrice: number): Promise<Coupon[]> {
        let response;
        if (category === CouponCategory.ALL) {
            response = await jwtAxios.get<Coupon[]>(globals.customer.getAllCoupons);
        } else {
            response = await jwtAxios.get<Coupon[]>(`${globals.customer.getCouponsByCategory}/${category}`);
        }
        const filteredCoupons = response.data.filter(coupon => coupon.price <= maxPrice);
        return filteredCoupons;
    }


    // useEffect(() => {
    //     console.log(coupons);
    //     // console.log(coupons.length);
    // }, [coupons]);


    const getCoupons = async () => {
        try {
            const couponsByCategoryAndPrice = await getCouponsByCategoryAndPrice(category, maxPrice);
            setCoupons(couponsByCategoryAndPrice);
        } catch (error) {
            setCoupons([]);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setMaxPrice(newValue as number);
    };

    const handleSelectChange = (event: SelectChangeEvent<CouponCategory>) => {
        const value = event.target.value as CouponCategory;
        setCategory(value);
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
        <div className="getCustomerCoupons">
            <div className="solid">
			<h1>הקופונים שלי</h1> <hr />
            <>
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
        <FormControl sx={{display: "flex",justifyContent: "center", maxWidth: "250px"}} id="category-wrapper">
        <InputLabel id="category" sx={{position: "absolute",top: "0px",left: "25px",padding: "0 4px"
        ,fontSize: "13px",fontWeight: "bold",}}>קטגוריה</InputLabel>
        <Select labelId="category" label="קטגוריה" value={category} sx={{mx: "auto", width: "200px"}} onChange={handleSelectChange}
            id="category-select"
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
            </FormControl>
            </>
            {coupons.map(item=><SingleCoupon key={item.id}
            coupon={item}
            updateCoupon={function (): void {
                throw new Error("Function not implemented.");
            } } couponPurchased={false}/>)}
            </div>
        </div>
    );
}

export default GetCustomerCoupons;
