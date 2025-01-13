import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './input.css';
import Router from './Router.tsx';
import { CollectionsProvider } from './context/CollectionContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CollectionsProvider>
            <Router />
        </CollectionsProvider>
    </StrictMode>
);
