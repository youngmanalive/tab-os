import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import { SizeProvider } from './context/size';

ReactDOM.render(
  <React.StrictMode>
    <SizeProvider>
      <App />
    </SizeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
