import React from 'react';

interface ModalProps {
    errorName: string;
    errorMessage: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ModalProps> = ({ errorName, errorMessage, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg font-bold">{errorName}</h2>
                <p>{errorMessage}</p>
                <button onClick={onClose} className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-md text-sm px-5 py-2.5 transition duration-200">
                    Zamknij
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
