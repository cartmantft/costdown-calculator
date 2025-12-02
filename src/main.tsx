import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import App from './App.tsx';
import './styles/global.css';

const attachZoomGuards = () => {
  const preventPinch = (event: TouchEvent) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  };

  let lastTouchEnd = 0;
  const preventDoubleTap = (event: TouchEvent) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  };

  document.addEventListener('touchstart', preventPinch, { passive: false });
  document.addEventListener('touchmove', preventPinch, { passive: false });
  document.addEventListener('touchend', preventDoubleTap, { passive: false });
};

if (typeof document !== 'undefined') {
  attachZoomGuards();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TDSMobileAITProvider>
      <App />
    </TDSMobileAITProvider>
  </StrictMode>
);
