import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/LoginPages/login';
import Register from './pages/LoginPages/register';
import Main from './pages/AppPages/main';
import App from './pages/AppPages/app';
import Display from './pages/AppPages/display';
import Edit from './pages/AppPages/edit';
import EditItem from './pages/AppPages/editItem';
import EditUsers from './pages/AppPages/editUsers';
import Statistics from './components/Chart';
import SwitchCollection from './pages/AppPages/switchCollection';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="app" element={<App />}>
                    <Route path="main" element={<Main />} />
                    <Route path="display" element={<Display />} />
                    <Route path="statistics/:item" element={<Statistics />} />
                    <Route path="edit" element={<Edit />} />
                    <Route path="edit/:item" element={<EditItem />} />
                    <Route path="edit/users" element={<EditUsers />} />
                    <Route path="switch-collection" element={<SwitchCollection />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
