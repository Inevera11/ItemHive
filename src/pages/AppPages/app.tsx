import Sidebar from '../../components/sidebar';
import { Outlet } from 'react-router-dom';

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
