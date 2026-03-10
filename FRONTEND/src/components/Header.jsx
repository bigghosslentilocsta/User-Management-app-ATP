import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div className='flex justify-between px-10 bg-amber-200'>
        <img src="https://imgs.search.brave.com/iJof6pkf2qx7wCZf25Ph9D6zKjqrt2UE5LRFyYbHLaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI2Lzk3/L2JjLzI2OTdiYzk1/MGJlMTgzNjM3YmMw/MDFmNWZkOGUyNmU4/LmpwZw" alt="" 
        className='w-20 rounded-[50%] m-3' />
        <ul className='flex gap-6 items-center m-10'>
            <li>
                <NavLink to="Home" className={({isActive})=>isActive? "border-2 p-1 rounded-2xl text-blue-100 bg-blue-700":""}>home</NavLink>
            </li>
            <li>
                <NavLink to="UserList" className={({isActive})=>isActive? "border-2 p-1 rounded-2xl text-blue-100 bg-blue-700":""}>List of users</NavLink>
            </li>
            <li>
                <NavLink to="AddUser" className={({isActive})=>isActive? "border-2 p-1 rounded-2xl text-blue-100 bg-blue-700":""}>add User</NavLink>
            </li>

        </ul>
    </div>
  )
}

export default Header