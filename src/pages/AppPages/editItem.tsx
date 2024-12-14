import { useParams } from 'react-router-dom';
import NewItem from '../../components/ItemForm';

const EditItem = () => {
    const { item } = useParams();
    return (
        <div>
            <p>EditItem{item}</p>
            <NewItem />
        </div>
    );
};

export default EditItem;
