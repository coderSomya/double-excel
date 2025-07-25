import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { LiveblocksProvider } from '@liveblocks/react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <LiveblocksProvider publicApiKey={import.meta.env.VITE_LIVEBLOCKS_PUBLIC_KEY}>
        <App />
      </LiveblocksProvider>
    </ClerkProvider>
  </StrictMode>
);
