import { Route, Routes } from "react-router-dom";
import "./MenuRouting.css";
import MainPage from '../../mainLayout/mainPage/mainPage';
import AddCompany from '../../admin/addCompany/addCompany';
import AddCustomer from "../../admin/addCustomer/addCustomer";
import DeleteCompany from "../../admin/deleteCompany/deleteCompany";
import GetAllCompanies from "../../admin/getAllCompanies/getAllCompanies";
import GetAllCustomers from '../../admin/getAllCustomers/getAllCustomers';
import GetCustomer from '../../admin/getCustomer/getCustomer';
import GetOneCompany from "../../admin/getOneCompany/getOneCompany";
import DeleteCustomer from '../../admin/deleteCustomer/deleteCustomer';
import UpdateCustomer from '../../admin/updateCustomer/updateCustomer';
import Page404 from '../../user/page404/page404';
import AddCoupon from '../../company/addCoupon/addCoupon';
import DeleteCoupon from '../../company/deleteCoupon/deleteCoupon';
import GetAllCompanyCoupons from '../../company/getAllCompanyCoupons/getAllCompanyCoupons';
import GetCouponsByCategory from '../../company/getCouponsByCategory/getCouponsByCategory';
import GetCouponsByMaxPrice from '../../company/getCouponsByMaxPrice/getCouponsByMaxPrice';
import UpdateCoupon from '../../company/updateCoupon/updateCoupon';
import GetCustomerCoupons from '../../customer/getCustomerCoupons/getCustomerCoupons';
import GetCustomerCouponsByCategory from '../../customer/getCustomerCouponsByCategory/getCustomerCouponsByCategory';
import GetCustomerCouponsByMoney from '../../customer/getCustomerCouponsByMaxPrice/getCustomerCouponsByMaxPrice';
import Login from '../../user/login/login';
import UpdateCompany from "../../admin/updateCompany/updateCompany";
import Menu from '../../mainLayout/menu/menu';
import GetCompanyDetails from "../../company/getCompanyDetails/getCompanyDetails";
import GetCustomerDetails from "../../customer/getCustomerDetails/getCustomerDetails";
import GetAllCompanyCoupons2 from '../../company/getAllCompanyCoupons2/getAllCompanyCoupons2';
import GetCustomerCouponsByMaxPrice from "../../customer/getCustomerCouponsByMaxPrice/getCustomerCouponsByMaxPrice";
// import GetOneCoupon from "../../company/getOneCoupon/getOneCoupon";

function MenuRouting(): JSX.Element {
    return (
        <div className="MenuRouting">
			<Routes>
                {/* Admin */}
                <Route path="/" element= {<MainPage/>}/>
                <Route path="/adminMenu" element= {<Menu/>}/>
                <Route path="admin/addCompany" element= {<AddCompany/>}/>
                <Route path="admin/addCustomer" element= {<AddCustomer/>}/>
                <Route path="admin/deleteCompany" element= {<DeleteCompany/>}/>
                <Route path="admin/deleteCustomer" element= {<DeleteCustomer/>}/>
                <Route path="admin/getAllCompanies" element= {<GetAllCompanies/>}/>
                <Route path="admin/getAllCustomers" element= {<GetAllCustomers/>}/>
                <Route path="admin/getCustomer" element= {<GetCustomer/>}/>
                <Route path="admin/getOneCompany" element= {<GetOneCompany/>}/>
                <Route path="admin/updateCompany" element= {<UpdateCompany/>}/>
                <Route path="admin/updateCustomer" element= {<UpdateCustomer/>}/>

                {/* Company */}
                <Route path="company/addCoupon" element= {<AddCoupon/>}/>
                <Route path="company/deleteCoupon" element= {<DeleteCoupon/>}/>
                {/*<Route path="company/allCoupons" element= {<GetAllCompanyCoupons/>}/>*/}
                <Route path="company/allCoupons" element= {<GetAllCompanyCoupons2/>}/>
                <Route path="company/getComapnyDetails" element= {<GetCompanyDetails/>}/>
                <Route path="company/getCouponsByCategory" element= {<GetCouponsByCategory/>}/>
                <Route path="company/getCouponsByMaxPrice" element= {<GetCouponsByMaxPrice/>}/>
                <Route path="company/updateCoupon" element= {<UpdateCoupon/>}/>
                {/* <Route path="company/getOneCoupon" element= {<GetOneCoupon/>}/> */}


                {/* Customer */}
                <Route path="customer/customerCoupons" element= {<GetCustomerCoupons/>}/>
                <Route path="customer/getCustomerCouponsByCategory" element= {<GetCustomerCouponsByCategory/>}/>
                <Route path="customer/getCustomerCouponsByMaxPrice" element= {<GetCustomerCouponsByMaxPrice/>}/>
                <Route path="customer/customerDetails" element= {<GetCustomerDetails/>}/>



                {/* General */}
                <Route path="login" element= {<Login/>}/>
                <Route path="guest" element= {<MainPage/>}/>
                <Route path="*" element= {<Page404/>}/>
            </Routes>
        </div>
    );
}

export default MenuRouting;
