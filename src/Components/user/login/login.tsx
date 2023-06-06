import "./login.css";
import axios from 'axios';
import { Button, ButtonGroup, Checkbox, FormControlLabel, SelectChangeEvent, TextField, Typography, Select, InputLabel, MenuItem, FormControl } from "@mui/material";
import { Send, Cancel } from "@mui/icons-material";
import UserCred from '../../../modal/userCred';
import Message from "../../../modal/message";
import { useForm } from "react-hook-form";
import { useState } from "react";
import notify from '../../../util/notify';
import advNotify, { ErrMsg, SccMsg } from "../../../util/notify_advanced";
import globals from "../../../util/global";
import jwtAxios from '../../../util/JWTaxios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/authState";
import { store } from "../../../redux/store";
import { downloadCompanies, downloadSingleCompany } from "../../../redux/companyState";
import { Company } from "../../../modal/Company";
import { Customer } from "../../../modal/Customer";
import GetAllCustomers from '../../admin/getAllCustomers/getAllCustomers';
import { downloadCustomers, downloadSingleCustomer } from "../../../redux/customerState";
import SingleCompany from '../../company/singleCompany/singleCompany';
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";



function Login(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<UserCred>();
    const [userType, setUserType] = useState("");
    //Use the hook useNavigate in react router V6
    const navigate = useNavigate();
    //Use the hook useHistory in react router V5,4
    //const history = useHistory();

    const changeHandler = (event:SelectChangeEvent) => {
      setUserType(event.target.value as string);
    }     


       //ES6
        const send = (msg:UserCred)=> {
        jwtAxios.post(globals.urls.login, msg)
        .then(response => {
          console.log(response);
          notify.success("!ברוך הבא");
          console.log(response.headers);
          store.dispatch(userLogin(response.headers.authorization));
          if (store.getState().authState.userType==="ADMIN") {
            if (store.getState().companyState.company.length<1) {
              jwtAxios.get<Company[]>(globals.admin.getAllCompanies)
              .then(response=>{
                store.dispatch(downloadCompanies(response.data));
              });
            }
              if (store.getState().customerState.customer.length<1) {
                jwtAxios.get<Customer[]>(globals.admin.getAllCustomers)
                .then(response=>{
                  store.dispatch(downloadCustomers(response.data));
                })
              .catch(err=>{
                advNotify.error("system have an error")
                console.log(err);
              });
            } 
          navigate("/");
          //history.push("/");
        }
        if (store.getState().authState.userType==="COMPANY") {
          jwtAxios.get<Company[]>(globals.company.getCompanyDetails)
          .then((response)=> {
            store.dispatch(downloadSingleCompany(response.data))
            navigate("/company/allCoupons");
          })
          .catch(err=>{
            advNotify.error("system have an error")
            console.log(err);
          });
        }
        if (store.getState().authState.userType==="CUSTOMER") {
          jwtAxios.get<Customer[]>(globals.customer.getCustomerDetails)
          .then((response)=> {
            store.dispatch(downloadSingleCustomer(response.data))
            navigate("/");
          })
          .catch(err=>{
            advNotify.error("system have an error")
            console.log(err);
          });
        }
      });
    };
    
    

    return (
        <div className="login SolidBox" dir="rtl">
			<Typography variant="h3" className="HeadLine" >כניסת משתמש</Typography><hr /><br />
            <form onSubmit={handleSubmit(send)}>
            <TextField type={"email"} name="email" label="מייל" variant="outlined" style={{background: "white"}} fullWidth {...register("email",{
                required: {
                value: true,
                message: 'יש להקיש מייל תקני'
              }
            })}/>
            <span>{errors.email?.message}</span>
            <br />
            <br /><br />
            <TextField type={"password"} name="userPassword" label="סיסמה" dir="rtl" variant="outlined" style={{background: "white"}} fullWidth {...register("password",{
                required: {
                    value: true,
                    message: 'לא הוקשה סיסמה'
                  }
            })}/>
            {errors.password && <span>דרוש סיסמה</span>}
            <br />
            <br /><br />
          <InputLabel id="uType" style={{marginLeft: "5px"}}>סוג משתמש</InputLabel>
            <Select labelId="uType" label="סוג משתמש" value={userType} style={{background: "white"}} fullWidth {...register("userType",{
              required: {
                value: true,
                message: 'לא הוקש סוג משתמש'
            }
            })}
              onChange={changeHandler}
            >
            <MenuItem value="ADMIN" style={{fontFamily: "Palatino-Italic"}}>ADMIN</MenuItem>
            <MenuItem value="COMPANY" style={{fontFamily: "Palatino-Italic"}}>COMPANY</MenuItem>
            <MenuItem value="CUSTOMER" style={{fontFamily: "Palatino-Italic"}}>CUSTOMER</MenuItem>
            </Select>
            <br />
          {errors.userType && <span>message error : {errors.userType.message}</span>}
            <br /><br />


          {/*<FormControlLabel name="showNotifications" label="זכור אותי" control={<Checkbox/>} {...register("remmemberMe")}/>*/}

            <br />
            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary">כניסה למערכת</Button>
                {/*<Button type="reset" color="secondary" startIcon={<Cancel/>}>Reset</Button>*/}
            </ButtonGroup>
            <br />
            {/*jwt*/}
            </form>
        </div>
    );
}

export default Login;





