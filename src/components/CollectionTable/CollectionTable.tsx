import { headers } from './headers';
import { Link } from 'react-router-dom';
import { SingleCollectionItem } from '../../context/types';
import { sortDates } from './sortDates';

const CollectionTable = ({ items }: { items: SingleCollectionItem[] }) => {
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
                {items.map((item) => {
                    item.updates.sort((a, b) => sortDates(a.timestamp, b.timestamp));
                    const newestUpdate = item.updates.length > 0 ? item.updates[item.updates.length - 1] : { absoluteAmount: '-', timestamp: '-', user: '-' };
                    return (
                        <tr key={item.id} className="odd:bg-yellow-200 even:bg-yellow-100 text-center">
                            <td>{item.name}</td>
                            <td>{newestUpdate.absoluteAmount}</td>
                            <td>{new Date(newestUpdate.timestamp).toLocaleDateString()}</td>
                            <td>{newestUpdate.user}</td>
                            <td className="flex gap-2 justify-center">
                                <Link to={`../edit/${item.url}`} className="text-orange-400">
                                    Edytuj
                                </Link>
                                <Link to={`../statistics/${item.url}`} className="text-red-400">
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
