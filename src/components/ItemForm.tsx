import React, { useState, useEffect } from 'react';
import { useCollections } from '../context/CollectionContext';
import { useUserSettings } from '../context/UserSettingsContext';
import { useNavigate } from 'react-router-dom';
import { Item } from '../context/CollectionContext';
import { sanitizeForUrl } from '../context/sanitizeForUrl';

interface ItemFormProps {
    existingItem?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({ existingItem }) => {
    const { currentCollectionName, currentUsername } = useUserSettings();
    const { addItemToCollection, updateItemInCollection, getCollection } = useCollections();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        timestamp: '',
        user: currentUsername || '', // Set default user as currentUsername
    });
    const [whitelist, setWhitelist] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (existingItem) {
            setFormData({
                name: existingItem.name,
                amount: existingItem.updates[existingItem.updates.length - 1].absoluteAmount.toString(),
                timestamp: new Date(existingItem.updates[existingItem.updates.length - 1].timestamp).toISOString().split('T')[0],
                user: existingItem.updates[existingItem.updates.length - 1].user,
            });
        } else {
            // If there is no existing item, set the user to the current username
            setFormData(prev => ({ ...prev, user: currentUsername || '' }));
        }
    }, [existingItem, currentUsername]);

    useEffect(() => {
        // Get the current collection's whitelist
        const collection = getCollection(currentCollectionName);
        if (collection) {
            setWhitelist(collection.whitelist);
        }
    }, [currentCollectionName, getCollection]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const collection = getCollection(currentCollectionName);
        const sanitizedName = sanitizeForUrl(formData.name);
        const existingItemInCollection = collection?.items.find(item => sanitizeForUrl(item.name) === sanitizedName);
        const absoluteAmountValue = Number(formData.amount);
        if (existingItemInCollection) {
            updateItemInCollection(currentCollectionName, formData.name, formData.timestamp, absoluteAmountValue, formData.user);
        } else {
            const structuredData = {
                name: formData.name,
                updates: [
                    {
                        timestamp: formData.timestamp,
                        absoluteAmount: absoluteAmountValue,
                        user: formData.user,
                    },
                ],
            };
            addItemToCollection(currentCollectionName, structuredData);
        }
        navigate('/app/display');
    };

    const inputStyle = 'border bg-yellow-200 rounded-lg px-3 py-2 my-2 w-full';
    const buttonStyle = 'text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200';
    const containerStyle = 'flex justify-center items-center mt-10';

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
                        <input type="number" name="amount" value={formData.amount} min="0" onChange={handleChange} className={inputStyle} />
                    </label>
                </div>
                <div>
                    <label>
                        Partia:
                        <input type="date" name="timestamp" value={formData.timestamp} onChange={handleChange} className={inputStyle} />
                    </label>
                </div>
                <div>
                    <label>
                        Kupujący:
                        <select name="user" value={formData.user} onChange={handleChange} className={inputStyle}>
                            <option value="">Wybierz użytkownika</option>
                            {whitelist.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
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