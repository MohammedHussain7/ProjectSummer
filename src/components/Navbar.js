import React, { useContext, useState } from 'react'
import logo from '../component/images/B1.png'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../GLOBAL/CartContext'
import { useAuth } from '../context/AuthContext'

export const Navbar = ({ user }) => {

    const navigate = useNavigate();
    const { totalQty } = useContext(CartContext);
    const {currentUser, logout}= useAuth();
    const [error, setError]=useState()

    // handle logout
    
  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }


    return (
        <div className='navbox'>
            <div className='leftside'>
                <img src={logo} alt="" />
            </div>
            {!currentUser && <div className='rightside'>
                <span><Link to="/signup" className='navlink'>SIGN UP</Link></span>
                <span><Link to="/login" className='navlink'>LOGIN</Link></span>
            </div>}
            {currentUser && <div className='rightside'>
                <span><Link to="/" className='navlink'>{user}</Link></span>
                <span><Link to="/cartproducts" className='navlink'><Icon icon={cart} /></Link></span>
                <span className='no-of-products'>{totalQty}</span>
                <span><button className='logout-btn' onClick={handleLogout}>Logout</button></span>
            </div>}
        </div>
    )
}
