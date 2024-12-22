const formatDate = (isoString: string): string => {
    if (!isoString) {
        throw new Error('Invalid date string');
    }
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const sortDates = (a: string, b: string) => {
    return new Date(formatDate(b)).getTime() - new Date(formatDate(a)).getTime();
};
