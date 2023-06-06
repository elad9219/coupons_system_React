import "./singleCompany.css";
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Company } from "../../../modal/Company";
import jwtAxios from '../../../util/JWTaxios';
import { deleteCompany, addCompany } from '../../../redux/companyState';
import globals from "../../../util/global";
import notify from '../../../util/notify';
import { store } from "../../../redux/store";
import { useEffect, useState } from "react";
import advNotify from "../../../util/notify_advanced";
import { downloadCoupons } from "../../../redux/couponState";
import { Coupon } from '../../../modal/Coupon';

interface SingleCompanyProps {
    company? : Company;
    updateCompany: () => void;
}


function SingleCompany(props: SingleCompanyProps): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [deleted, setDeleted] = useState(false);
    const [open, setOpen] = useState(false);    
    const [company, setCompany] = useState<Company | undefined>(props.company);


    // useEffect(() => {
    //     setCompany(props.company);
    // }, [props.company]);

    
const removeCompany = (): Promise<void> => {
    return jwtAxios.delete(globals.admin.deleteCompany+props.company.id)
        .then(response=>{
            if (response.status<300) {
                notify.success("נמחקה " + props.company.name + " חברת");
                store.dispatch(deleteCompany(props.company.id));
                setDeleted(true);
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 500) {
                notify.error("בעיה במחיקת חברה. נסה שוב מאוחר יותר.");
            } else {
                notify.error("אי אפשר למחוק חברה שיש לה קופונים שנרכשו ע׳׳י לקוחות. עליך למחוק את הקופונים קודם.");
            }
            throw error;
        });
};

const handleDeleteYes = () => {
    setOpen(true);
};
    
    const handleDeleteConfirm = () => {
        removeCompany()
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

    const updateCompany = () => {
        navigate("/admin/updateCompany", { state: { companyId: props.company.id } });
    };


    if (deleted) {
        navigate(+1); 
        return null;
    }



    return (
        <div className="singleCompany SolidBox">
			<h2 style={{textAlign: 'center'}}>{props.company.name}</h2><hr /><br />
            <b>id:</b>{props.company.id}<br /><br />
            <b>:email</b><br/> {props.company.email} <br /><br/>
            {store.getState().authState.userType==="ADMIN"? 
            <ButtonGroup variant="contained" fullWidth>
                <Button color="primary" onClick={()=>navigate("/company/allCoupons",
                {state: {companyId:props.company.id}})}>רשימת קופונים</Button>
                {/* <Button color="warning" onClick={()=>navigate("/admin/updateCompany",
                {state: {companyId:props.company.id}})}>עדכן חברה</Button> */}
                <Button color="warning" onClick={updateCompany}>עדכן חברה</Button>
                    <div>
                    <Button color="error" dir="rtl" style={{width:100}} fullWidth onClick={handleDeleteYes}>מחיקת חברה</Button>
                    <Dialog
                        open={open}
                        onClose={handleDeleteNo}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"?"+props.company.name+ " האם אתה בטוח שברצונך למחוק את חברת"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        .לא ניתן לשחזר את החברה והקופונים שלה לאחר המחיקה
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

export default SingleCompany;
