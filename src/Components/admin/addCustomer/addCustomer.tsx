import "./addCustomer.css";
import { Customer } from '../../../modal/Customer';
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import jwtAxios from '../../../util/JWTaxios';
import globals from '../../../util/global';
import notify from '../../../util/notify';
import { store } from "../../../redux/store";
import { addCustomer } from "../../../redux/customerState";
import { useEffect } from "react";
import advNotify from "../../../util/notify_advanced";

function AddCustomer(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<Customer>();
    const navigate = useNavigate();

    useEffect(() => {
        if (store.getState().authState.userType!="ADMIN") {
            advNotify.error("Please login...");
            navigate("/login");
        }
    },[]);

    const send = (newCustomer:Customer)=> {
        console.log(newCustomer);   
        jwtAxios.post(globals.admin.addCustomer,newCustomer)
        .then(response => {
            if (response.status<300) {
                notify.success("נוסף בהצלחה "+ newCustomer.first_name+" "+newCustomer.last_name + " לקוח");
            }
        })
        .catch(err=>{
            notify.error("בעיה בהוספת לקוח");
            console.log(err);
            console.error(err.data);
            console.error(err);
        })
        .finally(() => {
            navigate("/admin/getAllCustomers");
            store.dispatch(addCustomer(newCustomer)); 
        });
        };

    return (
        <div className="addCustomer">
			<h1>הוספת לקוח</h1> <hr />
            <div className="SolidBox">
        <form onSubmit={handleSubmit(send)}>
            <TextField name="email" label="מייל" variant="outlined" fullWidth {...register("email",{
                required: {
                value: true,
                message: 'יש להקיש מייל תקני'
                }
            })}/>
            <span>{errors.email?.message}</span>
            <br />
            <br /><br />
            <TextField type={"password"} name="Password" label="סיסמה" variant="outlined" 
            fullWidth {...register("password",{
                required: {
                    value: true,
                    message: 'לא הוקשה סיסמה'
                }
            })}/>
            {errors.password && <span>דרוש סיסמה</span>}
            <br />
            <br /><br />
            <TextField name="firstName" label="שם פרטי" variant="outlined" fullWidth className="TextBox" {...register("first_name",{
                required: {
                    value: true,
                    message: 'לא הוקש שם פרטי'
                }
            })}/>
            <br />
            {errors.first_name && <span>message error : {errors.first_name.message}</span>}
            <br /><br />
            <TextField name="lastName" label="שם משפחה" variant="outlined" fullWidth className="TextBox" {...register("last_name",{
                required: {
                    value: true,
                    message: 'לא הוקש שם משפחה'
                }
            })}/>
            <br />
            {errors.last_name && <span>message error : {errors.last_name.message}</span>}
            <br /><br />
            <br />
            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">הוספת לקוח</Button>
            </ButtonGroup>
            <br />
            </form>
            </div>
        </div>
    );
}

export default AddCustomer;
