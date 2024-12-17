import { useParams } from 'react-router-dom';
import NewItem from '../../components/ItemForm';

const EditItem = () => {
    const { item } = useParams();
    return (
        <div>
            <p>Edycja przedmiotu {item}</p>
            <NewItem />
        </div>
    );
};

export default EditItem;
