import { useState } from 'react';

interface FilterModalProps {
    isOpen: boolean;
    onApply: (filter1: string, filter2: string) => void;
}

const FilterModal = ({ isOpen,onApply }: FilterModalProps) => {
    const [filter1, setFilter1] = useState('');
    const [filter2, setFilter2] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded">
                <div className="mb-4">
                    <label className="block mb-2">Do zepsucia (dni)</label>
                    <input
                        type="text"
                        value={filter1}
                        onChange={(e) => setFilter1(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Dodający</label>
                    <input
                        type="text"
                        value={filter2}
                        onChange={(e) => setFilter2(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={() => onApply(filter1, filter2)} className="bg-yellow-300 text-black px-4 py-2 rounded">Apply</button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;