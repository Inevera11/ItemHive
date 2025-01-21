import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">{message}</h2>
                <div className="flex justify-end space-x-4">
                    <button onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">Nie</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded-lg">Tak</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
