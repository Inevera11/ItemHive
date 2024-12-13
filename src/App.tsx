import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Sidebar from './sidebar';
import { BlogProvider } from './BlogContext';
import BlogComponent from './BlogComponent';
import './app.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <BlogProvider>
            <div className="app-container">
                <Sidebar />
                <div className="content-container">
                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                        <img src={reactLogo} alt="React logo" />
                    </a>
                    <h1 className="text-orange-400">Item Hive</h1>
                    <button className="bg-teal-400" onClick={() => setCount(count + 1)}>
                        count is {count}
                    </button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                    <p className="text-3xl font-bold underline">Click on the Vite and React logos to learn more</p>
                    <BlogComponent />
                </div>
            </div>
        </BlogProvider>
    );
}

export default App;