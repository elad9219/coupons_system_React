import { Company } from "../modal/Company";



export class companyState {
    company : Company[] = [];
    singleCompany: Company | null;
    singleCompanyId: number | null;
}


export enum companyActionType {
    DownloadCompanies = "DownloadCompanies",
    DeleteCompany = "DeleteCompany",
    UpdateComapny = "UpdateComapny",
    AddCompany = "AddCompany",
    DownloadSingleCompany = "DownloadSingleCompany",
    GetSingleCompany = "GetSingleCompany",
}

export interface CompanyAction {
    type : companyActionType,
    payload? : any;
}

export function downloadCompanies(company: Company[]):CompanyAction {
    return {type: companyActionType.DownloadCompanies, payload: company};
}

export function deleteCompany(companyId: number):CompanyAction {    
    return {type : companyActionType.DeleteCompany,payload: companyId};
}

export function updateCompany(company:Company):CompanyAction {
    return {type: companyActionType.UpdateComapny,payload: company};
}

export function addCompany(company:Company):CompanyAction {
    return {type: companyActionType.AddCompany,payload: company};
}

export function downloadSingleCompany(company:Company[]):CompanyAction {    
    return {type : companyActionType.DownloadSingleCompany,payload: company};
}


export function getSingleCompany(company: Company): CompanyAction {
    return {type: companyActionType.GetSingleCompany, payload: company};
}


export function companyReducer(currentState:companyState = new companyState, action: CompanyAction): companyState {
    var newState = {...currentState};

    switch (action.type) {
        case companyActionType.DownloadCompanies: 
            newState.company = action.payload;
            console.log(action.payload);    
        break;

        case companyActionType.AddCompany: 
        /*
            //update backend
            console.log("redux payload:", action.payload);
            newState.company.push(action.payload);
            */

            return {
                ...currentState,
                company: [...currentState.company, action.payload]
            };
        break;
        

        case companyActionType.DeleteCompany:
            newState.company = newState.company.filter(item=>item.id!=action.payload);
        break;

        case companyActionType.UpdateComapny:
            /*
            var updatedCompanies = {...newState.company}.filter(item=>item.id!=action.payload.id);
            updatedCompanies.push(action.payload);
            newState.company = updatedCompanies;
            */

            return {
                ...currentState,
                company: currentState.company.map((c) => c.id === action.payload.id ? action.payload : c)
            };
        break;

        case companyActionType.DownloadSingleCompany:
           // newState.company.push(action.payload);
            const { payload } = action;
            const existingCompanyIndex = newState.company.findIndex(c => c.id === payload.id);
            if (existingCompanyIndex >= 0) {
                // If the company already exists in the state, update it
                newState.company = [
                ...newState.company.slice(0, existingCompanyIndex),
                payload,
                ...newState.company.slice(existingCompanyIndex + 1),
                ];
            } else {
                // If the company doesn't exist in the state, add it
                newState.company = [...newState.company, payload];
            }
        break;

        case companyActionType.GetSingleCompany:
            const companyId = action.payload;
            const singleCompany = newState.company.find((c) => c.id === companyId);
            newState.company = singleCompany ? [singleCompany] : [];
        break;
    }
            
    return newState;
}
