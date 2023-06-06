import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import advNotify from "../../../util/notify_advanced";
import "./getOneCompany.css";
import jwtAxios from '../../../util/JWTaxios';
import globals from "../../../util/global";
import { Company } from "../../../modal/Company";
import notify from "../../../util/notify";
import { downloadCompanies, downloadSingleCompany, getSingleCompany } from "../../../redux/companyState";
import SingleCompany from "../../company/singleCompany/singleCompany";
import { Button, ButtonGroup } from '@mui/material';
import { TextField } from '@mui/material';


interface GetOneCompanyProps {
    company? : Company;
}


function GetOneCompany(props: GetOneCompanyProps): JSX.Element {
    const navigate = useNavigate();
    const [getCompany, setGetCompany] = useState(false);
    const [company, setCompany] = useState<Company | undefined>(props.company);
    const [companyId, setCompanyId] = useState(0);



    useEffect(() => {
        if (store.getState().authState.userType!="ADMIN") {
            advNotify.error("Please login...");
            navigate("/login");
        }
    },[]);



        const findCompany = () => {
            jwtAxios.get(globals.admin.getOneCompany + companyId)
                .then((response) => {
                    setCompany(response.data);
                    setGetCompany(true);
                })
                .catch((err) => {
                    notify.error("חברה לא נמצאה");
                    console.error(err.data);
                });
        };
    
        const updateCompany = () => {
            navigate("/admin/updateCompany", { state: { companyId: company.id } });
        };

        
        
    
    return (
        <div className="getOneCompany">
			<h1> קבלת חברה לפי id</h1> <hr />
            <div className="SolidBox">
            <TextField type={"number"} name="companyId" label="id" fullWidth
            value={companyId}
            onChange={(event) => setCompanyId(event.target.value as unknown as number)}/>
            <br /><br />
            <Button variant="contained" fullWidth color="primary" onClick={findCompany}>מצא חברה</Button>
            <br /><br />
            {getCompany ? (
                <SingleCompany company={company} updateCompany={updateCompany} />
            ) : (
                ""
            )}
            </div>
        </div>
    );
}

export default GetOneCompany;


