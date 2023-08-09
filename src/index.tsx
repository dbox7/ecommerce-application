import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { apiRoot } from './app/ctp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

apiRoot.customers().post({body: {
  email: '123email@gmail.com',
  password: '123',
  firstName: 'aaa',
  lastName: 'bbbb'
}}).execute()
  .then(console.log)
  .catch(console.error);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
