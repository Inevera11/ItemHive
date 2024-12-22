import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/LoginPages/login';
import Register from './pages/LoginPages/register';
import Main from './pages/AppPages/main';
import App from './pages/AppPages/app';
import Display from './pages/AppPages/display';
import Edit from './pages/AppPages/edit';
import EditItem from './pages/AppPages/editItem';
import StatisticsOne from './pages/AppPages/statisticsOne';
import StatisticsMany from './pages/AppPages/statisticsMany';
import SwitchCollection from './pages/AppPages/switchCollection';
import Debug from './pages/AuxiliaryPages/debug';
import NotFound from './pages/AuxiliaryPages/notFound';

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
                    <Route path="statistics/:item" element={<StatisticsOne />} />
                    <Route path="statistics" element={<StatisticsMany />} />
                    <Route path="edit" element={<Edit />} />
                    <Route path="edit/:item" element={<EditItem />} />
                    <Route path="switch-collection" element={<SwitchCollection />} />
                </Route>
                <Route path="debug" element={<Debug />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;