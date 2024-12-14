import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './sidebar';
import './app.css';
import Home from './Home';
import Collection from './Collection';
import Statistics from './Statistics';
import NewItem from './NewItem';
import MockState from './MockState';
import { CollectionProvider } from './CollectionContext';

const App: React.FC = () => {
    return (
        <CollectionProvider>
            <Router>
                <div className='app-container'>
                    <Sidebar />
                    <div className='content-container'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/collection' element={<Collection />} />
                            <Route path='/collection/add' element={<NewItem />} />
                            <Route path='/statistics' element={<Statistics />} />
                            <Route path='/mockstate' element={<MockState />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </CollectionProvider>
    );
};

export default App;