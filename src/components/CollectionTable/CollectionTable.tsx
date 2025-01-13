import { headers } from './headers';
import { Link } from 'react-router-dom';
import { SingleCollectionItem } from '../../context/types';
import { sortDates } from './sortDates';

const CollectionTable = ({ items }: { items: SingleCollectionItem[] }) => {
    return (
        <div className='bg-yellow-100'>
            <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-yellow-300 border-b border-gray-300">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-6 py-3 text-left text-black font-semibold">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                        item.updates.sort((a, b) => sortDates(a.timestamp, b.timestamp));
                        const newestUpdate = item.updates.length > 0 ? item.updates[item.updates.length - 1] : { absoluteAmount: '-', timestamp: '-', user: '-' };
                        return (
                            <tr key={item.id} className="border-b border-gray-300 hover:bg-yellow-300 transition">
                                <td className="px-6 py-4">{item.name}</td>
                                <td className="px-6 py-4 text-center">{newestUpdate.absoluteAmount}</td>
                                <td className="px-6 py-4 text-center">{new Date(newestUpdate.timestamp).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{newestUpdate.user}</td>
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
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CollectionTable;
