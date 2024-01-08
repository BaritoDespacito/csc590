import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Topbar from './Components/topbar';
import Navbar from './Components/navbar';
import Image from './Components/image';
import Description from './Components/description';
import Footer from './Components/footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Topbar />
    <Navbar />
    <Image />
    <Description />
    <Footer />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
