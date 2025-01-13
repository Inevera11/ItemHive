import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SingleCollectionItem } from '../context/types';
import useCollections from '../context/useCollections';
import { sanitizeForUrl } from '../context/sanitizeForUrl';

interface ItemFormProps {
    existingItem: SingleCollectionItem;
}

const ItemForm: React.FC<ItemFormProps> = ({ existingItem }) => {
    const { getCollection, updateCollectionItems } = useCollections();
    const collection = getCollection();

    const getDefaultValues = () => {
        return {
            name: existingItem.name,
            amount: existingItem.updates[existingItem.updates.length - 1].absoluteAmount,
            timestamp: new Date(existingItem.updates[existingItem.updates.length - 1].timestamp).toISOString().split('T')[0],
            user: existingItem.updates[existingItem.updates.length - 1].user,
        };
    };
    const [formData, setFormData] = useState(getDefaultValues());
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const structuredData = {
            ...existingItem,
            name: formData.name,
            url: sanitizeForUrl(formData.name),
            updates: [
                {
                    timestamp: formData.timestamp,
                    absoluteAmount: Number(formData.amount),
                    user: formData.user,
                },
            ],
        };
        updateCollectionItems(structuredData);
        navigate('/app/display');
    };

    const inputStyle = 'border border-yellow-300 bg-yellow-200 focus:bg-yellow-100 rounded-lg px-3 py-2 my-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200';
    const buttonStyle = 'text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-5 py-2.5 transition duration-200';
    const containerStyle = 'flex justify-center items-center mt-10 px-4 md:px-10';

    return (
        <div className={containerStyle}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nazwa przedmiotu:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputStyle} />
                    </label>
                </div>
                <div>
                    <label>
                        Ilość:
                        <input type="number" name="amount" value={formData.amount} min={0} onChange={handleChange} className={inputStyle} />
                    </label>
                </div>
                <div>
                    <label>
                        Data ważności partii:
                        <input type="date" name="timestamp" value={formData.timestamp} onChange={handleChange} className={inputStyle} />
                    </label>
                </div>
                <div>
                    <label>
                        Kupujący:
                        <select name="user" value={formData.user} onChange={handleChange} className={inputStyle}>
                            {collection ? (
                                <>
                                    {collection.others.map((user) => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))}
                                    <option value={collection.owner}>{collection.owner}</option>
                                </>
                            ) : (
                                <></>
                            )}
                        </select>
                    </label>
                </div>
                <button type="submit" className={buttonStyle}>
                    Dodaj
                </button>
            </form>
        </div>
    );
};

export default ItemForm;
