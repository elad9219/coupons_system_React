import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import "./getCustomerCouponsByCategory.css";

function GetCustomerCouponsByCategory(): JSX.Element {
    const navigate = useNavigate();
/*
    useEffect(() => {
        if (store.getState().authState.userType!="CUSTOMER") {
            advNotify.error("Please login...");
            navigate("/login");
        }
    },[]);
    */
    
    return (
        <div className="getCustomerCouponsByCategory">
			<h1>הקופונים שלי לפי קטגוריה</h1> <hr />
        </div>
    );
}

export default GetCustomerCouponsByCategory;
