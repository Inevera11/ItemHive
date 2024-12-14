import React, { useState } from 'react';
import { useCollection } from '../context/CollectionContext'; // Przechowuje dane w localstorage i pozwala dodawać nowe dane przez addItem

// Dodawanie nowych przedmiotów (możnaby zmienić ten komponent aby mógł wyświetlać dane o istniejących przedmiotach)

const ItemForm: React.FC = () => {
    const { addItem } = useCollection();
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        timestamp: '',
        user: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const timestampInMillis = new Date(formData.timestamp).getTime();
        const structuredData = {
            identifier: formData.name.replace(/\s+/g, ''),
            name: formData.name,
            updates: [
                {
                    timestamp: timestampInMillis,
                    absoluteAmount: Number(formData.amount),
                    user: formData.user,
                },
            ],
        };
        addItem(structuredData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Nazwa przedmiotu:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Ilość:
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Partia:
                    <input type="date" name="timestamp" value={formData.timestamp} onChange={handleChange} />
                </label>
            </div>
            <div>
                <label>
                    Kupujący:
                    <input type="text" name="user" value={formData.user} onChange={handleChange} />
                </label>
            </div>
            <button type="submit" className="text-orange-400">
                Dodaj
            </button>
        </form>
    );
};

export default ItemForm;
