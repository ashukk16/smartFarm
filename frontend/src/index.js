import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import  AOS from 'aos';
import 'aos/dist/aos.css'
import { BrowserRouter } from 'react-router-dom';

AOS.init({duration: 1000});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<App></App>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
