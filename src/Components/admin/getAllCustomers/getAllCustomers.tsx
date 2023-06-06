import "./getAllCustomers.css";
import { useState, useEffect } from 'react';
import advNotify from '../../../util/notify_advanced';
import { useNavigate } from 'react-router-dom';
import { store } from "../../../redux/store";
import { Customer } from "../../../modal/Customer";
import GetCustomerDetails from '../../customer/singleCustomer/singleCustomer';
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import { downloadCustomers } from "../../../redux/customerState";

function GetAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    

    useEffect(() => {
        if (store.getState().authState.userType !== "ADMIN") {
            advNotify.error("Please login...");
            navigate("/login");
        }
/*
        if (store.getState().customerState.customer.length < 1) {
            jwtAxios.get<Customer[]>(globals.admin.getAllCustomers)
                .then(response => {
                    store.dispatch(downloadCustomers(response.data));
                    setCustomers(response.data);
                });
        } else {
            setCustomers(store.getState().customerState.customer);
        }
        */

        async function fetchData() {
            try {
                const response = await jwtAxios.get<Customer[]>(globals.admin.getAllCustomers);
                setCustomers(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);


    return (
        <div className="getAllCustomers">
			<h1>קבלת לקוחות</h1> <hr />
            {/* {customers.map(item=><SingleCustomer key={item.id} customer={item}/>)} */}
            {customers.map((customer: Customer) => (
                    <SingleCustomer key={customer.id} customer={customer} updateCustomer={function (): void {
                    throw new Error("Function not implemented.");
                } } />
                ))}
        </div>
    );
}

export default GetAllCustomers;
