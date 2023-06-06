import { Margin } from "@mui/icons-material";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./myHeader.css";
import homepage from "../../../assets/homepage.png";
import { Button } from "@mui/material";
import Login from '../../user/login/login';
import { userLogout } from "../../../redux/authState";
import { useDispatch } from "react-redux";
import { store } from "../../../redux/store";

function MyHeader(): JSX.Element {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getState = store.getState().authState.userType;


    const login =()=> {
        navigate("/login");
    }
    
    const logout = () => {
        dispatch(userLogout());
        navigate("/");
    };

    const ifUserLogin = () => {
        if (getState === '') {
            return(
                <>
                    <Button variant="contained" color="primary" onClick={login}>כניסה למערכת</Button>
                </>
            )
        } else{
            return(
            <Button variant="contained" color="error" onClick={logout}>יציאה מהמערכת</Button>
            )
        }
    };
    return (
        <div className="myHeader">
			<h1>מערכת קופונים</h1>
                <div className="botton-padding">
                {ifUserLogin()}
                </div>
            <div style={{position:"relative", textAlign:"right",paddingRight:"90px", bottom:"97px"}}>
                <NavLink to="/" style={{fontFamily:"cursive"}}>
                    <img src={homepage} alt="דף הבית" style={{width: "40px"}} />
                </NavLink>
            </div>
        </div>
    );
}

export default MyHeader;
