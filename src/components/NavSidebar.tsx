import React from 'react';
import { NavLink } from 'react-router-dom';
import useCollections from '../context/useCollections';

const Sidebar: React.FC = () => {
    const { loggedUser } = useCollections();

    const navStyle = 'flex items-center gap-3 px4 py-2 bg-yellow-200 text-black hover:bg-yellow-100 transition';

    return (
        <nav className="h-screen w-64 bg-yellow-200 flex flex-col justify-between py-6">
            <div className="px-4">
                <h1 className="text-2xl font-bold text-orange-600 mb-8">ItemHive</h1>
                <div className="flex flex-col gap-4">
                    <NavLink className={navStyle} to="main">
                        <i className="fas fa-home text-orange-500"></i>
                        Strona Główna
                    </NavLink>
                    <NavLink className={navStyle} to="display">
                        <i className="fas fa-box text-orange-500"></i>
                        Pokaż kolekcję
                    </NavLink>
                    <NavLink className={navStyle} to="edit">
                        <i className="fas fa-cogs text-orange-500"></i>
                        Zarządzaj kolekcją
                    </NavLink>
                    <NavLink className={navStyle} to="statistics">
                        <i className="fas fa-chart-bar text-orange-500"></i>
                        Pokaż statystyki
                    </NavLink>
                </div>
            </div>
            <div className="px-4">
                <div className="flex flex-col">
                    <NavLink className={navStyle} to="switch-collection">
                        <i className="fas fa-exchange-alt text-orange-500"></i>
                        Przełącz kolekcję
                    </NavLink>
                    <NavLink className={navStyle} to="/">
                        <i className="fas fa-sign-out-alt text-red-500"></i>
                        Wyloguj użytkownika
                    </NavLink>
                </div>
                <div className="mt-6 text-sm text-gray-600">
                    Zalogowany jako: (<span className="text-orange-600">{loggedUser ? loggedUser : ' niezalogowany'}</span>)  
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
