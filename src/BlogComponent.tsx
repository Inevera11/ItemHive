import React, { useContext, useState } from 'react';
import { BlogContext } from './BlogContext';
import './BlogComponent.css';

const BlogComponent = () => {
    const { blogContents, addBlogContent } = useContext(BlogContext)!;
    const [newBlogContent, setNewBlogContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addBlogContent(newBlogContent);
        setNewBlogContent('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    placeholder="Nazwa przedmiotu"
                />
                <button type="submit">Dodaj</button>
            </form>
            <ul>
                {blogContents.map((content, index) => (
                    <li key={index}>{content}</li>
                ))}
            </ul>
        </div>
    );
};

export default BlogComponent;
