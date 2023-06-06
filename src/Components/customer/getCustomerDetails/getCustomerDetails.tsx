import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import "./getCustomerDetails.css";
import { Customer } from '../../../modal/Customer';
import SingleCustomer from '../singleCustomer/singleCustomer';

function GetCustomerDetails(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(new Customer());


    useEffect(() => {
        if (store.getState().authState.userType!="CUSTOMER") {
            advNotify.error("Please login...");
            navigate("/login");
        }
        setCustomer(store.getState().customerState.customer[0])
    },[]);
    
    return (
        <div className="getCustomerDetails">
			<h1> פרטי לקוח </h1> <hr />
            <SingleCustomer key={customer.id} customer={customer} updateCustomer={function (): void {
                throw new Error("Function not implemented.");
            } }/>
        </div>
    );
}

export default GetCustomerDetails;
