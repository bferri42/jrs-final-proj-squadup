import React from 'react';
import logo from '../../images/logo.png'

import './Title.css'

export default function Title() {
  return (
    <div className='logo-root'>
      <img className='logo' src={logo} />
    </div>
  )
}
