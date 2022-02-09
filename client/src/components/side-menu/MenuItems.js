import React from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import './SideMenu.css'

const MenuItems = (props) => {
    const {name,subMenus,iconClassName,onClick} = props
    const [expand, setExpand] = useState(false);
    const navigate=useNavigate()
  return (
    <li onClick={onClick}>
    <a className='menu-item' onClick={()=> {
        setExpand(!expand)
        {
            subMenus.length===0 && navigate(`${props.to}`)
        }
        }}>
        <div className='menu-icon'>
            <i class={iconClassName}></i>
        </div>
        <span >{name}</span></a>
        {
            subMenus && subMenus.length>0 ?(
                <ul className={`sub-menu ${expand ? "active":""}`}>
                    {
                        subMenus.map((menu,index)=>
                         <li key={index}>
                        <Nav.Link style={{color:"#fff"}} onClick={()=>navigate(`${menu.to}`)}>{menu.name}</Nav.Link>
                        </li>
                        )
                    }
                </ul>
            ) :null
        }
        
</li>
  )
};

export default MenuItems;
