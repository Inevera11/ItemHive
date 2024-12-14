import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Login = () => {
    return (
        <div>
            <Button>
                <Link to="/app/main">Potwierdź</Link>
            </Button>
        </div>
    );
};

export default Login;
