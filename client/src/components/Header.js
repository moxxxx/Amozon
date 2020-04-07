import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import logo from './logo.bmp'
import MyBasket from './MyBasket'
const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item ">
                <img src={logo} style={{width:'180px'}} />
            </Link>
            <div className="right menu">
                <div>
                    <GoogleAuth />
                    <MyBasket content={'My Basket'}/>
                </div>
            </div>
        </div>
    )
}


export default Header