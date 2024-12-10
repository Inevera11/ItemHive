import { useState } from 'react';
import reactLogo from './assets/react.svg';
function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} alt="React logo" />
                </a>
            </div>
            <h1 className="text-orange-400">Item Hive</h1>
            <div>
                <button className="bg-teal-400" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="text-3xl font-bold underline">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
