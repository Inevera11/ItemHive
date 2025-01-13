import { ReactNode } from "react";

export type ButtonProps = {
    children: JSX.Element | string | ReactNode;
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
};
