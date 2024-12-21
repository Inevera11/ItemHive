import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './input.css';
import Router from './Router.tsx';
import { CollectionsProvider } from './context/CollectionContext';
import { UserSettingsContextProvider } from './context/UserSettingsContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CollectionsProvider>
            <UserSettingsContextProvider>
                <Router />
            </UserSettingsContextProvider>
        </CollectionsProvider>
    </StrictMode>
);
