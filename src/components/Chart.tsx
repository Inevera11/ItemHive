import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Adapter czasowy potrzebny aby traktować wartości czasowe jak inne wartości na osi
import zoomPlugin from 'chartjs-plugin-zoom'; // Przybliżanie i przemieszczanie wykresu

import { useCollections } from '../context/CollectionContext';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title, TimeScale, zoomPlugin);

interface ChartProps {
    collectionName: string;
    itemNames: string[];
}

const Chart: React.FC<ChartProps> = ({ collectionName, itemNames }) => {
    const { getCollection } = useCollections();
    const collection = getCollection(collectionName);

    if (!collection) {
        return <p className="text-gray-500">Nie znaleziono kolekcji</p>;
    }

    const items = itemNames
        ? collection.items.filter(item => itemNames.includes(item.name)) 
        : collection.items;

    const datasets = items.map((item, index) => {
        const hue = (index * 360) / items.length;
        const saturation = 100;
        const lightness = 50;
        let lastValidValue = null;

        const pointsAtItem = item.updates.map((update) => {
            const isoTimestamp = new Date(update.timestamp).toISOString();
            if (update) {
                lastValidValue = update.absoluteAmount;
                return { x: new Date(isoTimestamp), y: update.absoluteAmount };
            } else {
                return lastValidValue !== null ? { x: new Date(isoTimestamp), y: lastValidValue } : null;
            }
        }).filter(point => point !== null);

        return {
            label: item.name,
            data: pointsAtItem,
            borderColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%, 0.5)`,
            borderWidth: 2,
            fill: true,
        };
    });

    const chartData = {
        datasets: datasets,
    };

    const allTimestamps = datasets.flatMap(dataset => dataset.data.map(point => point.x));
    const minX = new Date(Math.min(...allTimestamps));
    const maxX = new Date(Math.max(...allTimestamps));
    const maxY = Math.max(...datasets.flatMap(dataset => dataset.data.map(point => point.y)));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Wykres ilości/liczby przedmiotów w zależności od czasu',
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                },
                limits: {
                    x : {
                        min: minX,
                        max: maxX,
                    },
                    y : {
                        min: 0,
                        max: maxY,
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', // Inne możliwości: 'day', 'month', 'year'
                },
                title: {
                    display: true,
                    text: 'Czas',
                },
                min: minX,
                max: maxX,
                bounds: 'ticks',
            },
            y: {
                title: {
                    display: true,
                    text: 'Ilość/liczba',
                },
                min: 0,
                bounds: 'data',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default Chart;