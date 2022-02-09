import React, { useContext } from 'react';
import "./Header.css"
import profile from '../../assets/user.png'
import axios from '../../axios'
import AuthContext from '../../context/AuthContext';

const Header = () => {
    const {getAdminLoggedIn} = useContext(AuthContext)
    const logout = async()=>{
        await axios.get('/admin/logout')
        getAdminLoggedIn()
    }

    return (
        <div className="header">
            <div className="header-left">
                <h3>username</h3>
            </div >
            <div className='header-right'>
                <div className='user-logo'>
                    <img src={profile} />
                </div>
                <h5 onClick={logout}>Logout</h5>
            </div>
        </div>
    )
};

export default Header;
