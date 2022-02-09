import React, { useEffect, useState } from 'react';
import './SideMenu.css'
import logo from '../../assets/logo1.png'
import user from '../../assets/user.png'
import MenuItems from './MenuItems';
import {menuItems} from '../../constants'

function SideMenu(props) {

    const [inactive, setInactive] = useState(false);
    useEffect(()=>{

        if(inactive){
            document.querySelectorAll('.sub-menu').forEach((el)=> {
                el.classList.remove("active")
            })
        }

        // props.collapse(inactive)

    },[inactive])
    
    return (
        <div className={`side-menu`}>
            <div className='top-section'>
                <div className='logo'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='toggle-menu-btn' onClick={() => setInactive(!inactive)}>
                    {inactive ? <i class="bi bi-arrow-right-square-fill"></i> : <i class="bi bi-arrow-left-square-fill"></i>}
                </div>
            </div>
            <div className='divider'></div>
            <div className='main-menu'>
                <ul>
                    {
                       menuItems.map((menuItem,index)=>(
                           <MenuItems 
                                key={index}
                                name={menuItem.name}
                                iconClassName={menuItem.iconClassName}
                                to ={menuItem.to}
                                subMenus={menuItem.subMenus || []}
                                onClick = {()=>{
                                    if(inactive){
                                        setInactive(false)
                                    }
                                }}
                           />
                       ))
                    }
                    <div className='divider'></div>
                </ul>
            </div>
            <div className='side-menu-footer'>
                <div className='avatar'>
                    <img src={user} alt="user" />
                </div>
                <div className='user-info'>
                    <h5>Admin</h5>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;

