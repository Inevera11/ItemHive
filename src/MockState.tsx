import React, { useState } from 'react';

import { useCollection } from './CollectionContext';

// Wczytywanie i eksportowanie danych z JSON

const MockState: React.FC = () => {
    const { items, setItems } = useCollection();
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');

    const serialize = () => {
        const serialized = JSON.stringify(items, null, 2);
        setInputValue(serialized);
    };

    const deserialize = () => {
        try {
            const deserializedItems = JSON.parse(inputValue);
            if (Array.isArray(deserializedItems)) {
                setItems(deserializedItems);
                setInputValue('');
                setMessage('Data deserialized successfully');
            } else {
                setMessage('Data is not an array');
            }
        } catch (error) {
            setMessage('Illegal JSON');
        }
    };

    const loadPreset = () => {
        const presetData = [
            {
                "identifier": "Opornik 1 Ohm",
                "updates": [
                    {
                        "timestamp": 1733049169000,
                        "absoluteAmount": 256,
                        "user": "babcia"
                    },
                    {
                        "timestamp": 1733308369000,
                        "absoluteAmount": 128,
                        "user": "dziadek"
                    },
                    {
                        "timestamp": 1733567569000,
                        "absoluteAmount": 64,
                        "user": "dziadek"
                    },
                    {
                        "timestamp": 1733740369000,
                        "absoluteAmount": 64,
                        "user": "babcia"
                    },
                    {
                        "timestamp": 1733826769000,
                        "absoluteAmount": 32,
                        "user": "wnuk"
                    },
                    {
                        "timestamp": 1734111126673,
                        "absoluteAmount": 16,
                        "user": "babcia"
                    }
                ]
            },
            {
                "identifier": "Masło 1kg",
                "updates": [
                    {
                        "timestamp": 1733049169000,
                        "absoluteAmount": 30,
                        "user": "bronislaw"
                    },
                    {
                        "timestamp": 1733308369000,
                        "absoluteAmount": 35,
                        "user": "bronislaw"
                    },
                    {
                        "timestamp": 1733567569000,
                        "absoluteAmount": 25,
                        "user": "babcia"
                    },
                    {
                        "timestamp": 1733740369000,
                        "absoluteAmount": 20,
                        "user": "babcia"
                    },
                    {
                        "timestamp": 1733826769000,
                        "absoluteAmount": 25,
                        "user": "babcia"
                    },
                    {
                        "timestamp": 1734111120673,
                        "absoluteAmount": 20,
                        "user": "babcia"
                    }
                ]
            }
        ];
        setItems(presetData);
        setMessage('Loaded data from preset successfully');
    };

    return (
        <div>
            <h2>Mock State</h2>
            <textarea
                rows={10}
                cols={50}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter JSON here...'
            />
            <div>
                <button onClick={serialize} className='text-orange-400'>Serialize</button>
                <button onClick={deserialize} className='text-orange-400'>Deserialize</button>
            </div>
            <div>
                <button onClick={loadPreset} className='text-orange-400'>Load from preset</button>
            </div>
            {message && <div>{message}</div>}
        </div>
    );
};

export default MockState;