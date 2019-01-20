import React from 'react';
import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="header">
         
        <ul className="flex no-decor">
          <li className="logo">
            <a className="logo" href="https://web.roblox.com/my/groups.aspx">
              <img src={logo} alt="" />
            </a>
            <div className="logo" />
          </li>
          <li>
              <Link to="/">Shirt Creator</Link>
          </li>
          <li>
          <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    )   
}

export default Navigation;