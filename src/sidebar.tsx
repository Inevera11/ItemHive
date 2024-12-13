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
                        <a href="">Strona główna</a>
                    </li>
                    <li>
                        <a href="">Pokaż moją kolekcję</a>
                    </li>
                    <li>
                        <a href="">Edytuj moją kolekcję</a>
                    </li>
                    <li>
                        <a href="">Pokaż statystyki</a>
                    </li>
                    <li className="bottom1">
                        <a href="">Zmień kolekcję</a>
                    </li>
                    <li className="bottom2">
                        <a href="">Wyloguj mnie</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;