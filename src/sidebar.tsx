import './sidebar.css';
import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="boczny_pasek">
            <div className="boczny_pasek__logo">
            </div>
            <div className="boczny_pasek__menu">
                <ul>
                    <li>
                        <a href="/">Strona główna</a>
                    </li>
                    <li>
                        <a href="/collection">Pokaż moją kolekcję</a>
                    </li>
                    <li>
                        <a href="">(no-op) Edytuj moją kolekcję</a> {/* TODO, jeśli ten element będzie zachowany jako osobny, mówione było że duplikowałby edycję z "Pokaż moją kolekcję"*/}
                    </li>
                    <li>
                        <a href="/statistics">Pokaż statystyki</a> {/* Obecnie pokazuje statystyki dla wzsystkich przedmiotów i skala czasu nie jest zmienialna */}
                    </li>
                    <li className="bottom1">
                        <a href="">(no-op) Zmień kolekcję</a>  {/* Brak implementacji */}
                    </li>
                    <li className="bottom2">
                        <a href="">(no-op) Wyloguj mnie</a> {/* Brak implementacji */}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;