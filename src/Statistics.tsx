import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title } from 'chart.js';

import { useCollection } from './CollectionContext';
import './statistics.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title);

const Statistics: React.FC = () => {
    const { items } = useCollection();
    const uniqueTimestamps = new Set();
    items.forEach(item => {
        item.updates.forEach(update => {
            uniqueTimestamps.add(update.timestamp);
        });
    });
    const sortedUniqueTimestamps = Array.from(uniqueTimestamps).sort();
    const datasets = items.map((item, index) => {
        let hue = (index * 360) / items.length;
        let saturation = 100;
        let lightness = 50;
        let lastValidValue = null;
        const pointsAtItem = sortedUniqueTimestamps.map(timestamp => {
            const update = item.updates.find(update => update.timestamp === new Date(timestamp).getTime());
            if (update) {
                lastValidValue = update.absoluteAmount;
                return update.absoluteAmount;
            } else {
                return lastValidValue;
            }
        });
        return {
            label: item.identifier,
            data: pointsAtItem,
            borderColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%, 0.5)`,
            borderWidth: 2,
            fill: true,
        };
    });
    const chartData = {
        labels: sortedUniqueTimestamps.map(uniqueTimestamp => (new Date(uniqueTimestamp)).toLocaleDateString()),
        datasets: datasets,
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Wykres ilości/liczby przedmiotów różnych rodzajów w zależności od czasu',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Timestamp',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Ilość/liczba',
                },
            },
        },
    };
    return (
        <div className="statistics-container">
            <h2>Statistics</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Statistics;