import React from 'react';
import "./Header.css"
import profile from '../../assets/user.png'


const Header = () => {
  return (
        <div className="header">
            <div className="header-left">
                <h3>username</h3>
            </div >
            <div className='header-right'>
                <div className='user-logo'>
                    <img src={profile}/>
                </div>
                <h5>Logout</h5>
            </div>
        </div>
  )
};

export default Header;
