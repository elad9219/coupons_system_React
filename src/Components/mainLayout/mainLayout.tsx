import "./mainLayout.css";
import MyHeader from './myHeader/myHeader';
import Menu from './menu/menu';
import MyFooter from "./myFooter/myFooter";
import { BrowserRouter } from "react-router-dom";
import MainPage from './mainPage/mainPage';
import MenuRouting from '../routing/MenuRouting/MenuRouting';

function MainLayout(): JSX.Element {
    return (
        <div className="mainLayout" dir="rtl">
            <BrowserRouter>
			<header>
                <MyHeader/>
            </header>
            <aside>
                <Menu/>
            </aside>
            <main>
                <MenuRouting/>
            </main>
            <footer>
                <MyFooter/>
            </footer>
            </BrowserRouter>
        </div>
    );
}

export default MainLayout;
