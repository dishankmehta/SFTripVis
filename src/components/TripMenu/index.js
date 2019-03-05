import React from 'react';
import { Menu } from 'antd';


export default function TripsMenu(data, onItemClicked) {
    if(!data) return null;
    return (
        <Menu>
            {
                data.map((item, index) => {
                    return (
                    <Menu.Item key={index} >
                        <a href="#" onClick={() => onItemClicked(item)}>{item}</a>
                    </Menu.Item>)
                })
            }
        </Menu>
      );
}