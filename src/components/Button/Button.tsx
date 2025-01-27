import { sizes } from './sizes';
import { ButtonProps } from './types';

const Button = ({ children, size = 'md', onClick, className = '' }: ButtonProps) => {
    const style = 'text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-5 py-2.5 transition duration-200';
    return (
<button
      className={`${style} ${sizes[size]} ${className || ''}`}
      onClick={onClick}
    >            {children}
        </button>
    );
};

export default Button;
