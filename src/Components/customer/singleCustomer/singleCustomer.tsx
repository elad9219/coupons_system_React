import { Customer } from "../../../modal/Customer";
import jwtAxios from "../../../util/JWTaxios";
import "./singleCustomer.css";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import globals from "../../../util/global";
import notify from '../../../util/notify';
import { store } from "../../../redux/store";
import { deleteCustomer } from "../../../redux/customerState";
import { useState } from "react";

interface SingleCustomerProps {
    customer? : Customer;
    updateCustomer: () => void;
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);
    const [open, setOpen] = useState(false);



    const removeCustomer = (): Promise<void> =>{
        return jwtAxios.delete(globals.admin.deleteCustomer + props.customer.id)
            .then(response => {
                if (response.status < 300) {
                    notify.success("נמחק " + props.customer.first_name + " הלקוח");
                    store.dispatch(deleteCustomer(props.customer.id));
                    setDeleted(true);
                } 
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    notify.error("אי אפשר למחוק לקוח שיש לו קופונים. עליך למחוק את הקופונים קודם.");
                } else {
                    notify.error("בעיה במחיקת קופון. נסה שוב מאוחר יותר.");
                }
                throw error;
            });
    }

    const handleDeleteYes = () => {
        setOpen(true);
    };
        
        const handleDeleteConfirm = () => {
            removeCustomer()
            .then(() => {
                setDeleted(true);
                setOpen(false);
            })
            .catch(() => {
                setOpen(false);
            });
        };
    
        const handleDeleteNo = () => {
            setOpen(false);
        };

        const updateCustomer = () => {
            navigate("/admin/updateCustomer", { state: { customerId: props.customer.id } });
        };

    if (deleted) {
        navigate(+1); 
        return null;
    }


    return (
        <div className="singleCustomer SolidBox">
        <h2 style={{textAlign: 'center'}}>{props.customer.first_name} {props.customer.last_name}</h2><hr /><br />
            <b>id:</b>{props.customer.id} <br /><br />
            <b>:email</b><br/> {props.customer.email} <br /><br/>
            {store.getState().authState.userType==="ADMIN"? 
            <ButtonGroup variant="contained" fullWidth>
                <Button color="primary" onClick={()=>navigate("/customer/customerCoupons",
                {state: {customerId:props.customer.id}})}>רשימת קופונים</Button>
                <Button color="warning" onClick={updateCustomer}>עדכן לקוח</Button>
                    <div>
                    <Button color="error" style={{width:100}} onClick={handleDeleteYes} fullWidth>מחיקת לקוח</Button>
                    <Dialog
                        open={open}
                        onClose={handleDeleteNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"?"+props.customer.first_name+" " +props.customer.last_name+ " האם אתה בטוח שברצונך למחוק את הלקוח"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        .לא ניתן לשחזר את הלקוח והקופונים שלו לאחר המחיקה
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions style={{ justifyContent: "center" }}>
                        <Button color="inherit" style={{width:"100px"}} onClick={handleDeleteNo}>ביטול</Button>
                        <Button color="error" style={{width:"100px"}} onClick={handleDeleteConfirm} autoFocus>
                            למחוק
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </div>
            </ButtonGroup>  
            : ""}
            </div>
    );
}

export default SingleCustomer;
