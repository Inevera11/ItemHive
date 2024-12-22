import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/NavSidebar';

const App = () => {
    return (
        <div className="h-screen flex">
            <Sidebar />
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
};

export default App;
