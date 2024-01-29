import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/layout.css';

const Layout = ({children}) => { //destructuration des propriétés + fonction fléchée 
    return(
        <div>
        <div className="content">
            <Banner />
            <NavBar />
            { children ?? <Outlet /> }
        </div>
                    <Footer />
        </div>
    );
} 

export default Layout;