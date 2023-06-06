import { Customer } from "../modal/Customer";

export class customerState {
    customer : Customer[] = [];
    singleCustomer: Customer | null;
    singleCustomerId: number | null;
}

export enum customerActionType {
    GetAllCustomers = "GetAllCustomers",
    DeleteCustomer = "DeleteCustomer",
    UpdateCustomer = "UpdateCustomer",
    AddCustomer = "AddCustomer",
    DownloadSingleCustomer = "DownloadSingleCustomer",
    GetSingleCustomer = "GetSingleCustomer",
}

export interface CustomerAction {
    type : customerActionType,
    payload? : any;
}

export function downloadCustomers(customer: Customer[]):CustomerAction {
    return {type: customerActionType.GetAllCustomers, payload: customer};
}

export function deleteCustomer(customerId: number):CustomerAction {    
    return {type : customerActionType.DeleteCustomer,payload: customerId};
}

export function updateCustomer(customer: Customer):CustomerAction {
    return {type: customerActionType.UpdateCustomer,payload: customer};
}

export function addCustomer(customer: Customer):CustomerAction {
    return {type: customerActionType.AddCustomer,payload: customer};
}

export function downloadSingleCustomer(customer:Customer[]):CustomerAction {    
    return {type : customerActionType.DownloadSingleCustomer,payload: customer};
}

export function getSingleCustomer(customer: Customer): CustomerAction {
    return {type: customerActionType.GetSingleCustomer, payload: customer};
}

export function customerReducer(currentState: customerState = new customerState, action: CustomerAction): customerState {
    var newState = {...currentState};

    switch (action.type) {
        case customerActionType.GetAllCustomers: 
            newState.customer = action.payload;
            console.log(action.payload);    
        break;

        case customerActionType.AddCustomer: 
        /*
            //update backend
            console.log("redux payload");
            console.log(action.payload);
            newState.customer.push(action.payload);
            */

            return {
                ...currentState,
                customer: [...currentState.customer, action.payload]
            };
        break;

        case customerActionType.DeleteCustomer:
            newState.customer = newState.customer.filter(item=>item.id!=action.payload);
        break;

        case customerActionType.UpdateCustomer:
            return {
                ...currentState,
                customer: currentState.customer.map((c) => c.id === action.payload.id ? action.payload : c)
            };
        break;

        case customerActionType.DownloadSingleCustomer:
            //newState.customer.push(action.payload);
            const { payload } = action;
            const existingCompanyIndex = newState.customer.findIndex(c => c.id === payload.id);

            if (existingCompanyIndex >= 0) {
                // If the customer already exists in the state, update it
                newState.customer = [
                ...newState.customer.slice(0, existingCompanyIndex),
                payload,
                ...newState.customer.slice(existingCompanyIndex + 1),
                ];
            } else {
                // If the customer doesn't exist in the state, add it
                newState.customer = [...newState.customer, payload];
            }
        break;

        case customerActionType.GetSingleCustomer:
            const customerId = action.payload;
            const singleCustomer = newState.customer.find((c) => c.id === customerId);
            newState.customer = singleCustomer ? [singleCustomer] : [];
        break;
    }
    return newState;
}
