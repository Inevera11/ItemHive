import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserSettings } from '../context/UserSettingsContext';

const Sidebar: React.FC = () => {
    const { currentUsername, setCurrentUsername, setCurrentCollectionName } = useUserSettings();

    const handleLogout = () => {
        setCurrentUsername(false);
        setCurrentCollectionName(false);
    };

    const navStyle = 'bg-yellow-200 border-solid border-2 border-orange-500 px-2 py-1 my-1 rounded-md active:bg-red-200';

    return (
        <nav className="flex py-4 flex-col h-full bg-yellow-200 px-4 justify-between">
            <div className="flex flex-col">
                <NavLink className={navStyle} to="main">
                    Strona Główna
                </NavLink>
                <NavLink className={navStyle} to="display">
                    Pokaż kolekcję
                </NavLink>
                <NavLink className={navStyle} to="edit">
                    Zarządzaj kolekcją
                </NavLink>
                <NavLink className={navStyle} to="statistics">
                    Pokaż statystyki
                </NavLink>
            </div>
            <div className="flex flex-col">
                <NavLink className={navStyle} to="switch-collection">
                    Przełącz kolekcję
                </NavLink>
                <NavLink className={navStyle} to="/" onClick={handleLogout}>
                    Wyloguj mnie (
                    <span className="text-red-400">
                        {currentUsername ? currentUsername : 'niezalogowany'}
                    </span>
                    )
                </NavLink>
            </div>
        </nav>
    );
};

export default Sidebar;