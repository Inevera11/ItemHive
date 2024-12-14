import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useCollection } from './CollectionContext';

const Collection: React.FC = () => {
    const navigate = useNavigate();
    const { items } = useCollection();

    const handleButtonClick = () => {
        navigate('/collection/add');
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Przedmiot</th>
                        <th>Ilość</th>
                        <th>Partia</th>
                        <th>Kupujący</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        // Wyświetlany jest stan według ostatniej aktualizacji, osoba aktualizująca z ostatniej akutlizacji
                        const lastUpdate = item.updates.sort((a, b) => b.timestamp - a.timestamp)[0];
                        return (
                            <tr key={index}>
                                <td>{item.identifier}</td>
                                <td>{lastUpdate.absoluteAmount}</td>
                                <td>{(new Date(lastUpdate.timestamp)).toLocaleDateString()}</td>
                                <td>{lastUpdate.user}</td>
                                <td>
                                    <button className='text-orange-400'>Edytuj</button>
                                    <button className='text-red-400'>Statystyki</button>
                                    <button className='text-orange-400'>Usuń</button>
                                    {/* TODO Przyciski nie mają styli zapobiegających ich "zlewaniu się" tutaj i w kilku innych miejscach*/}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button className='text-orange-400' onClick={handleButtonClick}>Dodaj nowy rodzaj</button>
        </div>
    );
};

export default Collection;