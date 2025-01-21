import useCollections from '../../context/useCollections';

const Main = () => {
    const { currentCollectionName } = useCollections();

    return (
        <div className="min-h-screen flex flex-col justify-start items-center bg-yellow-100 pt-32 relative">
            <h1 className="text-3xl font-bold mb-4 text-center">Witaj w Item Hive, <i>twoim wielofunkcyjnym pomocniku</i>!</h1>
            {currentCollectionName ? (
                <>
                    <p className="text-lg mb-2 text-gray-600">
                        Aktualnie oglądasz kolekcję <span className="font-semibold">{currentCollectionName}</span>
                    </p>
                    <p className="text-lg text-gray-600">W czym mogę ci dzisiaj pomóc?</p>
                </>
            ) : (
                <p className="text-lg items-center">
                    Wybierz kolekcję do przeglądania lub utwórz nową w sekcji <span className="flex flex-col font-bold items-center">Przełącz kolekcję</span>
                </p>
            )}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'url(/banner.svg)',
                    backgroundSize: '70% auto',
                    backgroundPosition: 'bottom right',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.16,
                    pointerEvents: 'none',
                }}
            ></div>
        </div>
    );
};

export default Main;
