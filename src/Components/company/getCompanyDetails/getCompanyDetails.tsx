import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../modal/Company";
import { store } from "../../../redux/store";
import jwtAxios from "../../../util/JWTaxios";
import advNotify from "../../../util/notify_advanced";
import SingleCompany from "../singleCompany/singleCompany";
import "./getCompanyDetails.css";
import globals from '../../../util/global';
import { companyState, downloadCompanies } from "../../../redux/companyState";


function GetCompanyDetails(): JSX.Element {
    const navigate = useNavigate();
    const [company, setCompany] = useState(new Company());


    useEffect(() => {
        if (store.getState().authState.userType!="COMPANY") {
            advNotify.error("Please login...");
            navigate("/login");
        }
        setCompany(store.getState().companyState.company[0])
    },[]);
    

    
    return (
        <div className="getCompanyDetails">
			<h1> פרטי חברה </h1> <hr />
            <SingleCompany key={company.id} company={company} updateCompany={function (): void {
                throw new Error("Function not implemented.");
            } } />
        </div>
    );
}


export default GetCompanyDetails;

