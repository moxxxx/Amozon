import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import logo from './logo.bmp'
import MyBasket from './MyBasket'
import User from './User'
const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item ">
                <img src={logo} style={{width:'180px'}} />
            </Link>
            <div className="right menu">
                <div>
                    <GoogleAuth />
                    <div className="ui secondary pointing menu">
                        <MyBasket content={'shop'}/>
                        <User />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header