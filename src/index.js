import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Main" element={<Main />}></Route>

            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);

