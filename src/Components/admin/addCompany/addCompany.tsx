import "./addCompany.css";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../modal/Company";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import jwtAxios from '../../../util/JWTaxios';
import globals from '../../../util/global';
import notify from '../../../util/notify';
import { store } from "../../../redux/store";
import { addCompany } from '../../../redux/companyState';
import { useEffect, useState } from "react";
import advNotify from "../../../util/notify_advanced";
import Message from '../../../modal/message';


function AddCompany(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<Company>();
    const navigate = useNavigate();


    useEffect(() => {
        if (store.getState().authState.userType!="ADMIN") {
            advNotify.error("Please login...");
            navigate("/login");
        }
    },[]);


    const send = (newCompany:Company)=> {
        console.log(newCompany);   
        jwtAxios.post(globals.admin.addCompany,newCompany)
        .then(response => {
            if (response.status<300) {
                notify.success("נוספה בהצלחה "+ newCompany.name + " חברת");
                navigate("/admin/getAllCompanies");
                store.dispatch(addCompany(newCompany)); 
            }
        })
        .catch(err=>{
            notify.error("בעיה בהוספת חברה");
            console.error(err.data);
        })
        /*
        .finally(() => {
            navigate("/admin/getAllCompanies");
            store.dispatch(addCompany(newCompany)); 
            console.log("newcompany: ",newCompany);
        });
        */
        };
    

    return (
        <div className="addCompany">
		<h1>הוספת חברה</h1> <hr />
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
            <TextField name="companyName" label="שם חברה" variant="outlined" fullWidth className="TextBox" {...register("name",{
                required: {
                    value: true,
                    message: 'לא הוקש שם חברה'
                }
            })}/>
            <br />
            {errors.name && <span>message error : {errors.name.message}</span>}
            <br /><br />


            {/*<FormControlLabel name="showNotifications" label="זכור אותי" control={<Checkbox/>} {...register("remmemberMe")}/>*/}

            <br />
            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">הוספת חברה</Button>
                {/*<Button type="reset" color="secondary" startIcon={<Cancel/>}>Reset</Button>*/}
            </ButtonGroup>
            <br />
            </form>
            </div>
        </div>
    );
}

export default AddCompany;

