import React from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';

const Main = () => {
    const { currentCollectionName } = useUserSettings();

    return (
        <div className="flex flex-col items-center gap-10 mt-20 text-lg">
            <h1>Witaj w Item Hive, twoim wielofunkcyjnym pomocniku!</h1>
            <p>
                Aktualnie oglądasz kolekcję <span className="font-bold">{currentCollectionName || 'Brak wybranej kolekcji'}</span>
            </p>
            <p>W czym mogę ci dzisiaj pomóc?</p>
        </div>
    );
};

export default Main;