import { NavLink } from "react-router-dom";
import "./menu.css";
import { authState, authReducer } from '../../../redux/authState';
import { store } from "../../../redux/store";
import AllCoupons from '../../user/allCoupons/allCoupons';
import { useState } from 'react';
import { useEffect } from 'react';



function Menu(): JSX.Element {
    const [userType, setUserType] = useState("");

    
    const adminMenu = ()=> {
        return (
            <>
            מנהל מערכת <br />
            <NavLink to="admin/addCompany">הוספת חברה</NavLink><br />
            <NavLink to="admin/addCustomer">הוספת לקוח</NavLink><br />
            <NavLink to="admin/getAllCompanies">הצגת חברות</NavLink><br />
            <NavLink to="admin/getAllCustomers">הצגת לקוחות</NavLink><br />
            <NavLink to="admin/getOneCompany">קבלת חברה</NavLink><br />
            <NavLink to="admin/getCustomer">קבלת לקוח</NavLink><br />
            <br />
            </>
        );
    };

    const companyMenu = ()=> {
        return (
            <>
                תפריט חברה <br />
                <NavLink to="company/addCoupon">הוספת קופון</NavLink><br />
                <NavLink to="company/allCoupons">רשימת קופונים</NavLink><br />
                <NavLink to="company/getComapnyDetails">פרטי חברה</NavLink><br />
                {/* <NavLink to="company/getOneCoupon">קבלת קופון</NavLink><br /> */}
                <br />
            </>
        );
    };

    const customerMenu = ()=> {
        return (
            <>
                לקוח<br />
                <NavLink to="customer/customerCoupons">רשימת קופונים</NavLink><br />
                <NavLink to="customer/customerDetails">פרטי לקוח</NavLink><br />
            </>
        );
    };

    useEffect(() => {
        store.subscribe(()=> {
            setUserType(store.getState().authState.userType);
        });
    });

    return (
        <div className="menu">
            <>
            {store.getState().authState.userType === "ADMIN" && adminMenu()} 
            {store.getState().authState.userType === "COMPANY" && companyMenu()}
            {store.getState().authState.userType === "CUSTOMER" && customerMenu()}
            </>
        </div>
    );
}

export default Menu;
