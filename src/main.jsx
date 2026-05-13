import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppV1 from './AppV1';
import './styles.css';

const isV1Hash = () => window.location.hash.startsWith('#v1');

function Root() {
  const [v1, setV1] = useState(isV1Hash());
  useEffect(() => {
    const fn = () => setV1(isV1Hash());
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return v1 ? <AppV1 /> : <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
