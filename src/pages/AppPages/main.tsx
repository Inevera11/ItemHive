import useCollections from '../../context/useCollections';

const Main = () => {
    const { currentCollectionName } = useCollections();

    return (
        <div className="flex flex-col items-center gap-10 mt-20 text-lg">
            <h1>Witaj w Item Hive, twoim wielofunkcyjnym pomocniku!</h1>
            {currentCollectionName ? (
                <>
                    <p>
                        Aktualnie oglądasz kolekcję <span className="font-bold">{currentCollectionName}</span>
                    </p>
                    <p>W czym mogę ci dzisiaj pomóc?</p>
                </>
            ) : (
                <p>
                    Wybierz kolekcję do przeglądania lub utwórz nową w sekcji <span className="font-bold">Przełącz kolekcję</span>
                </p>
            )}
        </div>
    );
};

export default Main;
