import React from 'react'
import "./Header.css"
const Header = () => {
    return (
        <div className="navbar-area">
            <div className="navbar-component">
                <div className="loogo">
                    <h1>RoomEase</h1>
                </div>
                <hr className='hr'/>
                <div className="navlist">
                    <ul className='navlist-items'>
                        <li className='navlist-item'>DESTINATION</li>
                        <li className='navlist-item'>EXPIARENCES</li>
                        <li className='navlist-item'>VILLAS</li>
                        <li className='navlist-item'>PRIVATE HOMES</li>
                        <li className='navlist-item'>STORIES</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header