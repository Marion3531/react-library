import React from 'react';
import { Outlet } from 'react-router-dom';
import Banner from './Banner';
import NavBar from './NavBar';

const Layout = ({children}) => { //destructuration des propriétés + fonction fléchée 
    return(
        <div>
            <Banner />
            <NavBar />
            { children ?? <Outlet /> }
        </div>
    );
} 

export default Layout;