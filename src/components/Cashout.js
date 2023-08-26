import React, { useState, useEffect, useContext } from 'react'
import { db } from '../DB/lib/init-firebase'
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../GLOBAL/CartContext'
import  NavBar  from '../component/NavBar';
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export const Cashout = ({user}) => {

    const history = useNavigate();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState(''); 
    const [error, setError] = useState('');
    const {currentUser}= useAuth();
    const [successMsg, setSuccessMsg] = useState('');
    const [cart, setCart] = useState([]);


    useEffect(() => {
        // if (user) {
        //     const ref1= collection(db, 'Users', user.email)
                
        //     getDoc(ref1).then((value) =>{

        //         setName(value.data().name)
        //         setEmail(value.data().email)
        //     })
        // }
       
        shoppingCart.map(item=>{setCart(item)})
        console.log(cart)
        
  if(currentUser){
    const ref = doc(db, "Users",currentUser.email);
    
    const docSnap =  getDoc(ref).then(value=>{
        setName(value.data().name)
        setEmail(value.data().email)

    });

  }

        })
        
    

    const cashoutSubmit = (e) => {
        e.preventDefault();
            if (user) {
                const date = new Date();
                const time = date.getTime();
                
                const ref1 = collection(db,'Buyer-info ' + currentUser.email)
                const ref3 = addDoc(ref1 ,
                     {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    CartCon: shoppingCart,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty})
                // .doc('_' + time).set({
                //     BuyerName: name,
                //     BuyerEmail: email,
                //     BuyerCell: cell,
                //     BuyerAddress: address,
                //     BuyerPayment: totalPrice,
                //     BuyerQuantity: totalQty
                // }
                // ))
                .then(() => 
                {
                    setCell('');
                    setAddress('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Your order has been placed successfully. Thanks for visiting us. You will be redirected to home page after 5 seconds');
                    setTimeout(() => {
                        history('/')
                    }, 5000)
                }).catch(err => setError(err.message)
                )
            }}
        
    

    return (
        <>
        <h1>qss</h1>
            <div className='container'>
                <br />
                <h2>Cashout Details</h2>
                <br />
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                <form autoComplete="off" className='form-group' onSubmit={cashoutSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control' required
                        value={name} disabled />
                    <br />
                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control' required
                        value={email} disabled />
                    <br />
                    <label htmlFor="Cell No">Cell No</label>
                    <input type="number" className='form-control' required
                        onChange={(e) => setCell(e.target.value)} value={cell} placeholder='eg 03123456789' />
                    <br />
                    <label htmlFor="Delivery Address">Delivery Address</label>
                    <input type="text" className='form-control' required
                        onChange={(e) => setAddress(e.target.value)} value={address} />
                    <br />
                    <label htmlFor="Price To Pay">Price To Pay</label>
                    <input type="number" className='form-control' required
                        value={totalPrice} disabled />
                    <br />
                    <label htmlFor="Total No of Products">Total No of Products</label>
                    <input type="number" className='form-control' required
                        value={totalQty} disabled />
                    <br />
                    <button type="submit" className='btn btn-success btn-md mybtn'>SUBMIT</button>
                </form>
                {error && <span className='error-msg'>{error}</span>}
            </div>
        </>
    )
}