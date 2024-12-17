import { useParams } from 'react-router-dom';
import Chart from '../../components/Chart';

const Statistics = () => {
    const { item } = useParams();
    return (
        <div>
            <p>Statystyki przedmiotu {item}</p>
            <Chart />
        </div>
    );
};

export default Statistics;
