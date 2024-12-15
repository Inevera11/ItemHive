import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './input.css';
import Router from './Router.tsx';
import { CollectionProvider } from './context/CollectionContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CollectionProvider>
            <Router />
        </CollectionProvider>
    </StrictMode>
);
