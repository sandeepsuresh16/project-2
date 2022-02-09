import React, { useState } from 'react';
import './sidemenu.css'
import logo from '../../assets/logo.png'


function SideMenu() {
    const [inactive, setInactive] = useState(false);
  return(
      <div className={`side-menu ${inactive ? "inactive" : ""}`}>
          <div className='top-session'>
        <div className="logo">
            <img src={logo}/>
        </div>
        <div className="toggle-side-btn" onClick={()=>setInactive(!inactive)}>
            <i className="bi bi-list"></i>
        </div>
        </div>
        <div className='divider'></div>
        <div className='main-menu'>
            <ul>
                <li>
                    <a className='menu-item'>
                        <div className='menu-icon'>
                            <i class="bi bi-speedometer2"></i>
                        </div>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li>
                    <a className='menu-item'>
                        <div className='menu-icon'>
                            <i class="bi bi-speedometer2"></i>
                        </div>
                        <span>Dashboard</span>
                    </a>
                    <ul className="sub-menu">
                        <li>
                            <a>Course-1</a>
                        </li>
                        <li>
                            <a>Course-2</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
      </div>
  )
}


