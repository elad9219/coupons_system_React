import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../modal/Coupon";
import "./getOneCoupon.css";
import { useEffect, useState } from "react";
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify from "../../../util/notify";
import { Button, TextField } from "@mui/material";
import SingleCoupon from "../singleCoupon/singleCoupon";
/*

interface GetOneCouponProps {
    coupon? : Coupon;
}


function GetOneCoupon(props: GetOneCouponProps): JSX.Element {
    const navigate = useNavigate();
    const [getCoupon, setGetCoupon] = useState(false);
    const [coupon, setCoupon] = useState<Coupon | undefined>(props.coupon);
    const [couponId, setCouponId] = useState(0);

    

    useEffect(() => {
        if (store.getState().authState.userType!="COMPANY") {
            advNotify.error("Please login...");
            navigate("/login");
        }
    },[]);
    


    const findCoupon = () => {
        jwtAxios.get(globals.company.getOneCompanyCoupon + couponId)
            .then((response) => {
                setCoupon(response.data);
                setGetCoupon(true);
                console.log(response.data);
            })
            .catch((err) => {
                notify.error("קופון לא נמצא");
                console.error(err.data);
            });
    };

    const updateCoupon = () => {
        navigate("/company/updateCoupon", { state: { couponId: coupon.id } });
    };


    return (
        <div className="getOneCoupon">
			<h1> קבלת קופון לפי id</h1> <hr />
            <div className="SolidBox">
            <TextField type={"number"} name="couponId" label="id" fullWidth
            value={couponId}
            onChange={(event) => setCouponId(event.target.value as unknown as number)}/>
            <br /><br />
            <Button variant="contained" fullWidth color="primary" onClick={findCoupon}>מצא קופון</Button>
            <br /><br />
            {getCoupon ? (
                <SingleCoupon coupon={coupon} updateCoupon={updateCoupon} />
            ) : (
                ""
            )}
            </div>
        </div>
    );
}

export default GetOneCoupon;

*/