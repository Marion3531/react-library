import React from 'react';
import Banner from './Banner';
import NavBar from './NavBar';

const Layout = ({children}) => { //destructuration des propriétés + fonction fléchée 
    return(
        <div>
            <Banner />
            <NavBar />
            {children}
        </div>
    );
} 

export default Layout;