import { useState } from 'react';
import { FilterModalProps } from './types';

const FilterModal = ({ isOpen, onApply, whitelist }: FilterModalProps) => {
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
                <h2 className="text-lg font-bold">Wybierz opcje filtrowania</h2>
                <div className="mb-4">
                    <label className="block mb-2">Maksymalna liczba dni do zepsucia:</label>
                    <input type="number" value={filter1} onChange={(e) => setFilter1(e.target.value)} className="border p-2 w-full rounded-lg bg-yellow-200" min="0" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Dodający ostatniej partii:</label>
                    <select value={filter2} onChange={(e) => setFilter2(e.target.value)} className="border p-2 w-full rounded-lg bg-yellow-200">
                        <option value="">Wybierz użytkownika</option>
                        {whitelist.map((user) => (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={() => onApply(filter1, filter2)} className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
                        Zastosuj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
