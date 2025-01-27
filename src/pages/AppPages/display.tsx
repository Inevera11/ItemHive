import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import CollectionTable from '../../components/CollectionTable/CollectionTable';
import FilterModal from '../../components/FilterModal/FilterModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import useCollections from '../../context/useCollections';
import { SingleCollectionItem } from '../../context/types';

const Display = () => {
    const { getCollection, currentCollectionName, removeCollectionItem } = useCollections();

    const initFilteredItems = () => {
        const currCollection = getCollection();
        return currCollection ? currCollection.items : [];
    };

    const getWhiteList = () => {
        const currCollection = getCollection();
        return currCollection ? currCollection.others : [];
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState<SingleCollectionItem[]>(initFilteredItems());
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [filter1, setFilter1] = useState<string>('');
    const [filter2, setFilter2] = useState<string>('');

    const handleApplyFilters = (filter1: string, filter2: string) => {
        setFilter1(filter1);
        setFilter2(filter2);
        
        const filtered = initFilteredItems().filter((item) => {
        const matchesFilter1 = filter1
            ? item.updates.some((update) => {
                const itemDate = new Date(update.timestamp);
                const today = new Date();
                const timeDiff = itemDate.getTime() - today.getTime();
                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                const filterDays = parseInt(filter1, 10);
                return diffDays <= filterDays;
                })
            : true;
        const matchesFilter2 = filter2
            ? (() => {
                  const latestUpdate = item.updates.reduce((latest, update) => {
                      const updateDate = new Date(update.timestamp);
                      return updateDate > latest.date ? { date: new Date(updateDate), user: update.user } : latest;
                  }, { date: new Date(0), user: '' });
                  return latestUpdate.user.includes(filter2);
              })()
            : true;
            return matchesFilter1 && matchesFilter2;
        });
        setFilteredItems(filtered);
        setIsModalOpen(false);
    };

    const handleDelete = (url: string) => {
        setItemToDelete(url);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            removeCollectionItem(itemToDelete);
            setFilteredItems((prevItems) => prevItems.filter(item => item.url !== itemToDelete));
            setItemToDelete(null);
        }
        setIsModalOpen(false);
    };

    const cancelDelete = () => {
        setItemToDelete(null);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-[80%] bg-white shadow-md rounded-lg p-8 mt-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">{currentCollectionName ? `Tabela przedmiotów kolekcji: ${currentCollectionName}` : 'Nie wybrano kolekcji'}</h1>
                <div className="flex flex-col gap-10">
                    {filteredItems.length > 0 ? (
                        <CollectionTable items={filteredItems} onDelete={handleDelete} />
                    ) : (
                        <div className="text-center text-gray-500">
                            <p>Brak przedmiotów do wyświetlenia.</p>
                            <p>Dostosuj użyte filtry lub dodaj nowe przedmioty.</p>
                        </div>
                    )}
                    {filter1 && <p className="text-center text-gray-500 mt-4">Filtrowanie według daty ważności poniżej: {filter1} dni</p>}
                    {filter2 && <p className="text-center text-gray-500 mt-4">Filtrowanie według kupującego: {filter2}</p>}
                    <div className="self-end flex gap-4 mt-6">
                        <Button>
                            <Link to="../edit/new">
                                <i className="fas fa-plus mr-2"></i>
                                Dodaj przedmiot
                            </Link>
                        </Button>
                        <Button
                            onClick={() => {
                                setFilteredItems(initFilteredItems());
                                setFilter1('');
                                setFilter2('');
                            }}>
                            <i className="fas fa-broom mr-2"></i>
                            Wyczyść filtry
                        </Button>
                        <Button onClick={() => setIsModalOpen(true)}>
                            <i className="fas fa-filter mr-2"></i>
                            Filtruj
                        </Button>
                    </div>
                </div>
                <FilterModal
                    isOpen={isModalOpen}
                    onApply={handleApplyFilters}
                    onCancel={() => setIsModalOpen(false)}
                    whitelist={getWhiteList()}
                />
                <ConfirmationModal
                    isOpen={!!itemToDelete}
                    message={`Czy na pewno chcesz usunąć przedmiot ${itemToDelete}?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </div>
    );
};

export default Display;
