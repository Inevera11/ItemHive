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
                <button onClick={onClose} className="mt-4 text-black bg-yellow-400 hover:bg-yellow-500 rounded-md px-4 py-2">
                    Zamknij
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;
