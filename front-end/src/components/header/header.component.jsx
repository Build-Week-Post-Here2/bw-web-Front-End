import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>

        </Link>
        <div className='options'>
            <Link className='option' to='/dashboard'>
                DASHBOARD
            </Link>
            <Link className='option' to='/log-in'>
                LOG IN
            </Link>
        </div>
    </div>
)

export default Header;