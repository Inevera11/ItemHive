import { Item } from '../../context/CollectionContext';
import { headers } from './headers';
import { Link } from 'react-router-dom';
import { sanitizeForUrl } from '../../context/sanitizeForUrl';

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
                    // Wyświetlany jest stan według ostatniej aktualizacji, osoba aktualizująca z ostatniej aktualizacji
                    item.updates.sort((a, b) => b.timestamp - a.timestamp);
                    const newestUpdate = item.updates[item.updates.length - 1];
                    const sanitizedName = sanitizeForUrl(item.name);
                    return (
                        <tr key={index + sanitizedName} className="odd:bg-yellow-200 even:bg-yellow-100 text-center">
                            <td>{item.name}</td>
                            <td>{newestUpdate.absoluteAmount}</td>
                            <td>{new Date(newestUpdate.timestamp).toLocaleDateString()}</td>
                            <td>{newestUpdate.user}</td>
                            <td className="flex gap-2 justify-center">
                                <Link to={`../edit/${sanitizedName}`} className="text-orange-400">
                                    Edytuj
                                </Link>
                                <Link to={`../statistics/${sanitizedName}`} className="text-red-400">
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