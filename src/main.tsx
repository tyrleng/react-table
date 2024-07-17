import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Example from './Table';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Example />
    {/* <App /> */}
  </StrictMode>,
);
