import React from 'react'

import { Spin, Icon } from 'antd';

import './spinner.css';

const antIcon = <Icon type="loading" style={{ fontSize: 100 }} spin />;

export default () => (
  <div className='spinner-container'>
    <Spin indicator={antIcon}/>
  </div>
)