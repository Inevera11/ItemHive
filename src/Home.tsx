import React from 'react';

const Home: React.FC = () => {
    return (
        <div>
            <h2>Witaj w Item Hive</h2>
            {/* Poniższa linia być może nie powinna być wyświetlana przy zwykłym użytkowaniu */}
            <a href='/mockstate' className='text-orange-400'>Załaduj przykładowe dane lub dane z JSON</a> 
        </div>
    );
};

export default Home;