import React from 'react';
import { Icon } from 'antd';
import Menu from '../../containers/Menu';

export const  Header = ({title}) => (
    <nav className="app-nav">
        <div className={"nav-title"}>{title}</div>
        <Menu />
        <a className="nav-git-icon" href="https://github.com/dishankmehta/SFTripVis"><Icon type="github"/></a>
    </nav>
);