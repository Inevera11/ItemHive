export type FilterModalProps = {
    isOpen: boolean;
    onApply: (filter1: string, filter2: string) => void;
    onCancel: () => void;
    whitelist: string[];
};
