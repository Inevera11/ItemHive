import { sizes } from './sizes';
import { ButtonProps } from './types';

const Button = ({ children, size = 'md', onClick }: ButtonProps) => {
    const style = 'text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5';
    return (
        <button className={style + sizes[size]} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
