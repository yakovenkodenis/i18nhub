import React from 'react';
import { BrowserRouter, Match, Link } from 'react-router';

import Header from '../../components/header';
import Footer from '../../components/footer';


const MainLayout = ({ children }) => (
    <div>
        <Header />
        <main>
            { children }
        </main>
        <Footer />
    </div>
);

export default MainLayout;
