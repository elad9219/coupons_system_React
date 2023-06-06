import { Typography, TextField, Button, ButtonGroup } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Company } from "../../../modal/Company";
import { store } from "../../../redux/store";
import "./updateCompany.css";
import jwtAxios from '../../../util/JWTaxios';
import globals from "../../../util/global";
import notify from "../../../util/notify";
import advNotify, { ErrMsg } from '../../../util/notify_advanced';
import { updateCompany } from "../../../redux/companyState";


function UpdateCompany(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<Company>();
     //We will use useLocation hook to get the parameters that we are passing
    const location = useLocation();
    //get the object from useLocation
    const [company,setCompany] = useState<Company | null>(null);
    const {companyId} = location.state as any;
    const navigate = useNavigate();



/*
    useEffect(()=>{
        setCompany(store.getState().companyState.company.find(item=>companyId == item.id));
        // console.log("companyId:", companyId);
    },[]);
    */


    useEffect(() => {
        // fetch the company data by its id
        jwtAxios.get(globals.admin.getOneCompany + companyId)
        .then(response => {
            setCompany(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [companyId]);
    

    const send = ()=> {
        console.log(company);
        jwtAxios.put(globals.admin.updateCompany,company)
        .then(response => {
            if (response.status<300) {
                notify.success("עודכנה בהצלחה "+ company.name+  " חברת");
                navigate("/admin/getAllCompanies");
                store.dispatch(updateCompany(company)); 
            }
        })
        .catch(err=>{
            notify.error("בעיה בעדכון חברה");
            console.log(err);
            console.error(err.data);
        })
        /*
        .finally(() => {
            navigate("/admin/getAllCompanies");
            store.dispatch(updateCompany(company)); 
        });
        */
    };


    


    const emailChange = (args:SyntheticEvent)=> {
        const newCompany = { ...company };
        newCompany.email = (args.target as HTMLInputElement).value;
        setCompany(newCompany);
    };



    if (!company) {
        return <div>Loading...</div>;
    }

    
    
    return (
        <div className="updateCompany SolidBox">
			<Typography variant="h3" className="HeadLine" >עדכון חברה</Typography><hr /><br />
            <form onSubmit={handleSubmit(send)}>
            <TextField name="email" label="מייל" variant="outlined" fullWidth {...register("email",{
            required: {
                value: true,
                message: 'יש להקיש מייל תקני'
            }
            })} defaultValue={company.email} onChange={emailChange}/>
            <span>{errors.email?.message}</span> 
            <br />
            <br /><br />
            <TextField name="name" label="שם חברה" variant="outlined" fullWidth {...register("name",{
            })} value={company.name} disabled/>
            <br />
            <br /><br />

            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">עדכן חברה</Button>
            </ButtonGroup>
            <br />
            </form>
        </div>
    );
}

export default UpdateCompany;

