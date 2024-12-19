import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CollectionTable from '../../components/CollectionTable/CollectionTable';
import { useCollection } from '../../context/CollectionContext';
import FilterModal from '../../components/FilterModal/FilterModal';

const Display = () => {
    const { items } = useCollection();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState(items);

    const handleApplyFilters = (filter1: string, filter2: string) => {
        const filtered = items.filter(item => {
            const matchesFilter1 = filter1 ? item.updates.some(update => {
                const itemDate = new Date(update.timestamp);
                const filterDays = parseInt(filter1, 10);
                const today = new Date();
                // Dodajemy dni do obecnej daty, aby uzyskać datę "końcową"
                const targetDate = new Date(today.setDate(today.getDate() + filterDays));

                // Porównujemy daty, uwzględniając tylko daty (bez godzin)
                return itemDate.toDateString() === targetDate.toDateString();
            }) : true;

            const matchesFilter2 = filter2 ? item.updates.some(update => update.user.includes(filter2)) : true;

            return matchesFilter1 && matchesFilter2;
        });

        setFilteredItems(filtered);
        setIsModalOpen(false);
    };



    return (
        <div className="mt-10 flex flex-col items-center">
            <div className="w-[80%] flex flex-col gap-10">
                <CollectionTable items={filteredItems} />
                <div className="self-end flex gap-10">
                    <Button>
                        <Link to="../edit/UNKNOWN">Dodaj przedmiot</Link>
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>Filtruj</Button>
                </div>
            </div>
            <FilterModal
                isOpen={isModalOpen}
                onApply={handleApplyFilters}
            />
        </div>
    );
};

export default Display;