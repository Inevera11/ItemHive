import { createContext, useState, useEffect, ReactNode } from 'react';

interface BlogContextType {
    blogContents: string[];
    addBlogContent: (content: string) => void;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
    children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
    const [blogContents, setBlogContents] = useState<string[]>([]);

    const addBlogContent = (content: string) => {
        setBlogContents((prevContents) => [...prevContents, content]);
    };

    useEffect(() => {
        console.log(`Ilosc przedmiotow: ${blogContents.length}`);
    }, [blogContents]);

    return (
        <BlogContext.Provider value={{ blogContents, addBlogContent }}>
            {children}
        </BlogContext.Provider>
    );
};
