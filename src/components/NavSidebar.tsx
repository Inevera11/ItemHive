import React from 'react';
import { NavLink } from 'react-router-dom';
import useCollections from '../context/useCollections';

const Sidebar: React.FC = () => {
    const { loggedUser, currentCollectionName } = useCollections();

    const navStyle = 'flex items-center gap-3 px-4 py-2 bg-yellow-200 text-black hover:bg-yellow-100 transition rounded shadow-lg';
    const activeNavStyle = 'flex items-center gap-3 px-4 py-2 bg-orange-200 text-black hover:bg-orange-100 transition rounded shadow-lg';

    return (
        <nav className="h-screen w-64 bg-yellow-200 flex flex-col justify-between py-6 rounded shadow-inner">
            <div className="px-4">
                <NavLink to="main" className="grid grid-flow-col items-center m-4">
                    <img src="/logo.svg" className="h-10" />
                    <h1 className="text-2xl font-bold text-orange-600 mb-0">ItemHive</h1>
                </NavLink>
                <div className="flex flex-col gap-4">
                    <NavLink className={({ isActive }) => (isActive ? activeNavStyle : navStyle)} to="main">
                        <i className="fas fa-home text-orange-500"></i>
                        Strona Główna
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? activeNavStyle : navStyle)} to="display">
                        <i className="fas fa-box text-orange-500"></i>
                        Pokaż kolekcję
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? activeNavStyle : navStyle)} to="edit">
                        <i className="fas fa-cogs text-orange-500"></i>
                        Zarządzaj kolekcją
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? activeNavStyle : navStyle)} to="statistics">
                        <i className="fas fa-chart-bar text-orange-500"></i>
                        Pokaż statystyki
                    </NavLink>
                </div>
            </div>
            <div className="px-4">
                <div className="flex flex-col gap-4">
                    <NavLink className={({ isActive }) => (isActive ? activeNavStyle : navStyle)} to="switch-collection">
                        <div className="flex flex-col">
                            <p>
                                <i className="fas fa-exchange-alt text-orange-500"></i>
                                Przełącz kolekcję
                            </p>
                            <span className="mt-1 text-sm text-gray-600">
                                Obecnie: <span className="text-orange-600">{currentCollectionName ? currentCollectionName : ' brak'}</span>
                            </span>
                        </div>
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? activeNavStyle : navStyle)} to="/">
                        <div className="flex flex-col">
                            <p>
                                <i className="fas fa-sign-out-alt text-red-500"></i>
                                Wyloguj użytkownika
                            </p>
                            <span className="mt-1 text-sm text-gray-600">
                                Obecnie: <span className="text-red-500">{loggedUser ? loggedUser : ' niezalogowany'}</span>
                            </span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
