import useCollections from '../../context/useCollections';

const Main = () => {
    const { currentCollectionName } = useCollections();

    return (
        <div className="min-h-screen flex flex-col justify-start items-center bg-yellow-100 pt-32">
            <h1 className="text-3xl font-bold mb-4 text-center">Witaj w Item Hive, twoim wielofunkcyjnym pomocniku!</h1>
            {currentCollectionName ? (
                <>
                    <p className="text-lg mb-2">
                        Aktualnie oglądasz kolekcję <span className="font-semibold text-gray-800">{currentCollectionName}</span>
                    </p>
                    <p className="text-lg">W czym mogę ci dzisiaj pomóc?</p>
                </>
            ) : (
                <p className="text-lg items-center">
                    Wybierz kolekcję do przeglądania lub utwórz nową w sekcji <span className="flex flex-col font-bold items-center">Przełącz kolekcję</span>
                </p>
            )}
        </div>
    );
};

export default Main;
