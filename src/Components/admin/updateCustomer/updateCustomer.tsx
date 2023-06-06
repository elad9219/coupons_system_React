import "./updateCustomer.css";
import { Typography, TextField, Button, ButtonGroup } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import jwtAxios from '../../../util/JWTaxios';
import globals from "../../../util/global";
import notify from "../../../util/notify";
import advNotify, { ErrMsg } from '../../../util/notify_advanced';
import { Customer } from "../../../modal/Customer";
import { updateCustomer } from "../../../redux/customerState";

function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<Customer>();
     //We will use useLocation hook to get the parameters that we are passing
    const location = useLocation();
    //get the object from useLocation
    const [customer,setCustomer] = useState<Customer | null>(null);
    const {customerId} = location.state as any;
    const navigate = useNavigate();


    useEffect(() => {
        // fetch the customer data by its id
        jwtAxios.get(globals.admin.getOneCustomer + customerId)
        .then(response => {
            setCustomer(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [customerId]);

    const send = ()=> {
        console.log(customer);
        jwtAxios.put(globals.admin.updateCustomer,customer)
        .then(response => {
            if (response.status<300) {
                notify.success("עודכן בהצלחה "+ customer.first_name+" "+customer.last_name+  " לקוח");
                navigate("/admin/getAllCustomers");
                store.dispatch(updateCustomer(customer)); 
            }
        })
        .catch(err=>{
            notify.error("בעיה בעדכון לקוח");
            console.error(err.data);
        })
    };

    const emailChange = (args:SyntheticEvent)=> {
        const newCustomer = { ...customer };
        newCustomer.email = (args.target as HTMLInputElement).value;
        setCustomer(newCustomer);
    };


    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="updateCustomer SolidBox">
            <Typography variant="h3" className="HeadLine" >עדכון לקוח</Typography><hr /><br />
            <form onSubmit={handleSubmit(send)}>
            <TextField name="email" label="מייל" variant="outlined" fullWidth {...register("email",{
            required: {
                value: true,
                message: 'יש להקיש מייל תקני'
            }
            })} placeholder={customer.email} defaultValue={customer.email} onChange={emailChange}/>
            <span>{errors.email?.message}</span>
            <br />
            <br /><br />
            <TextField name="name" label="שם פרטי" variant="outlined" fullWidth {...register("first_name",{

            })} value={customer.first_name} disabled/>
            <br />
            <br /><br />
            <TextField name="name" label="שם משפחה" variant="outlined" fullWidth {...register("last_name",{

            })} value={customer.last_name} disabled/>
            <br />
            <br /><br />

            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">עדכן לקוח</Button>
            </ButtonGroup>
            <br />
            </form>
        </div>
    );
}

export default UpdateCustomer;
