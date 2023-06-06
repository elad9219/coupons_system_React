import "./getAllCompanies.css";
import { useState, useEffect } from 'react';
import SingleCompany from '../../company/singleCompany/singleCompany';
import advNotify from '../../../util/notify_advanced';
import { useNavigate } from 'react-router-dom';
import { Company } from '../../../modal/Company';
import { store } from "../../../redux/store";
import { useSelector } from "react-redux";
import { addCompany, companyState, downloadCompanies } from '../../../redux/companyState';
import jwtAxios from "../../../util/JWTaxios";
import globals from "../../../util/global";
import notify from "../../../util/notify";

function GetAllCompanies(): JSX.Element {
    const navigate = useNavigate();
    const [companies, setCompanies] = useState<Company[]>([]);
    
    

    useEffect(() => {
        if (store.getState().authState.userType !== "ADMIN") {
            advNotify.error("Please login...");
            navigate("/login");
        }
        async function fetchData() {
            try {
                const response = await jwtAxios.get<Company[]>(globals.admin.getAllCompanies);
                setCompanies(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    
    
    return (
        <div className="getAllCompanies">
			<h1>קבלת חברות</h1> <hr />
            {/* insert search box */}
            {/*<SingleCompany id={0} name={"Osem"} email={"osem@osem.com"}/> */}
            {/* {companies.map(item=><SingleCompany key={item.id} company={item}/>)} */}
            {companies.map((company: Company) => (
                    <SingleCompany key={company.id} company={company} updateCompany={function (): void {
                    throw new Error("Function not implemented.");
                } } />
                ))}
        </div>
    );
}

export default GetAllCompanies;
