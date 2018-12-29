import React from 'react';
import logo from '../images/logo.svg';

const Navigation = () => {
    return (
        <div className="header">
         
        <ul className="flex">
          <li className="logo">
            <a className="logo" href="https://web.roblox.com/my/groups.aspx">
              <img src={logo} alt="" />
            </a>
            <div className="logo" />
          </li>
          <li>
              <a href="/">Shirt Creator</a>
          </li>
          <li>
              <a href="/about">About</a>
          </li>
          <li>
              <a href="/donate">Donate</a>
          </li>
        </ul>
      </div>
    )   
}

export default Navigation;