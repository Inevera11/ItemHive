import Button from '../../components/Button/Button';

const SwitchCollection = () => {
    return (
        <div className="h-screen pt-10">
            <h1 className="text-center">Aktualnie oglądasz kolekcję Kolekcja1</h1>
            <div className="flex items-end flex-col pr-[30%] gap-10 mt-10">
                <label className="flex gap-10">
                    Zmień aktualnie oglądaną kolekcję:
                    <input className="bg-yellow-300" />
                </label>
                <label className="flex gap-10">
                    Utwórz nową kolekcję:
                    <input className="bg-yellow-300" />
                </label>
                <Button>Zatwierdź</Button>
            </div>
        </div>
    );
};

export default SwitchCollection;
