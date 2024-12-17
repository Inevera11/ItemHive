import { Item } from '../../context/CollectionContext';
import { headers } from './headers';
import { Link } from 'react-router-dom';

const CollectionTable = ({ items }: { items: Item[] }) => {
    return (
        <table className="w-full">
            <thead className="bg-yellow-300">
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => {
                    // Wyświetlany jest stan według ostatniej aktualizacji, osoba aktualizująca z ostatniej akutlizacji
                    const lastUpdate = item.updates.sort((a, b) => b.timestamp - a.timestamp)[0];
                    return (
                        <tr key={index + item.identifier} className="odd:bg-yellow-200 even:bg-yellow-100 text-center">
                            <td>{item.name}</td>
                            <td>{lastUpdate.absoluteAmount}</td>
                            <td>{new Date(lastUpdate.timestamp).toLocaleDateString()}</td>
                            <td>{lastUpdate.user}</td>
                            <td className="flex gap-2 justify-center">
                                <Link to={`../edit/${item.identifier}`} className="text-orange-400">
                                    Edytuj
                                </Link>
                                <Link to={`../statistics/${item.identifier}`} className="text-red-400">
                                    Statystyki
                                </Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CollectionTable;
