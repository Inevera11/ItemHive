import { headers } from './headers';
import { Link } from 'react-router-dom';
import { SingleCollectionItem } from '../../context/types';
import { sortDates } from './sortDates';
import useCollections from '../../context/useCollections';

interface PreparedItem {
    id: string;
    name: string;
    newestUpdate: {
        absoluteAmount: string;
        timestamp: string;
        user: string;
    };
    isPast: boolean;
    url: string;
}

const CollectionTable = ({ items, onDelete }: { items: SingleCollectionItem[], onDelete: (url: string) => void }) => {
    const preparedItems = items.map((item) => {
        item.updates.sort((a, b) => sortDates(a.timestamp, b.timestamp));
        const newestUpdate = item.updates.length > 0 ? item.updates[item.updates.length - 1] : { absoluteAmount: '-', timestamp: '-', user: '-' };
        const isPast = new Date(newestUpdate.timestamp) < new Date();
        return {
            id: item.id,
            name: item.name,
            newestUpdate,
            isPast,
            url: item.url,
        };
    });
    preparedItems.sort((a, b) => sortDates(a.newestUpdate.timestamp, b.newestUpdate.timestamp));
    return (
        <div className='bg-yellow-100'>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-300 border-b border-gray-300">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-6 py-3 text-center text-black font-semibold">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {preparedItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                            <td className="px-6 py-4 text-center flex items-center justify-center">{item.name}</td>
                            <td className="px-6 py-4 text-center">{item.newestUpdate.absoluteAmount}</td>
                            <td className="px-6 py-4 text-center">
                                {item.isPast && <i className="fas fa-exclamation-triangle text-yellow-500 mr-2" title="Warning: This update is in the past"></i>}
                                {new Date(item.newestUpdate.timestamp).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-center">{item.newestUpdate.user}</td>
                            <td className="px-6 py-4 text-center flex gap-4 justify-center">
                                <div className="relative group">
                                    <Link to={`../edit/${item.url}`} className="text-orange-500 hover:text-orange-700">
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white text-black text-xs rounded py-1 px-2">
                                        Edytuj
                                    </span>
                                </div>
                                <div className="relative group">
                                    <Link to={`../statistics/${item.url}`} className="text-red-400">
                                        <i className="fas fa-chart-bar"></i>
                                    </Link>
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white text-black text-xs rounded py-1 px-2">
                                        Statystyki
                                    </span>
                                </div>
                                <div className="relative group">
                                    <button onClick={() => onDelete(item.url)} className="text-orange-500 hover:text-orange-700">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-white text-black text-xs rounded py-1 px-2">
                                        Usuń
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CollectionTable;
