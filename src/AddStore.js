import React, { useEffect, useState } from 'react'
import './AddStore.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom';
import { db } from "./DB/lib/init-firebase";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import { Alert, Button } from 'react-bootstrap';
import NavBar from './component/NavBar';
function AddStore(props) {
    const [title, setTitle]= useState('')
    const [link, setLink]= useState() 
    const [photo, setPhoto]= useState('')
    const [price, setPrice]= useState()
    useEffect(() => {
        console.log()
      }, []);

    const [category, setCategory]= useState("")

    const navigate = useNavigate();

    const [full, setFull]= useState('')
    const [check , setCheck]= useState('')

    const [size , setSize]= useState('')
    const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
    const ref = doc(db, "Users",currentUser.email);
    const docSnap =  getDoc(ref).then(value=>{
        setCheck(value.data().news)
    });
    //(props.trigger) ?
    function handleSubmit(e){
        e.preventDefault()
        if ((title==="" ) || (photo==="")){
            return alert("لازم تحط صورة و عنوان")
        }
        const newsRef = collection(db, "Store")
        addDoc(newsRef, {
            Title:title,
            photo:photo,
            link:link,
            full:full,
            price:price,
            category:category      
        }).then(response =>{
            console.log(response)
            alert("Done")
        }).catch(error=>{
            console.log(error.message)
        })
        alert(title) 
    }
    if (currentUser && check==="1")
  return  (
    <>
    <NavBar/>
    <br></br><br></br><br></br><br></br>
    <div className='popup' style={{position:"relative" , backgroundColor:"white"}} >
        <div className='popup-inner'>
            <form onSubmit={handleSubmit}>
                <div className='form-group' >
                <label className = "text-right" htmlFor="Title" > العنوان</label>
                <input type='text' value={title} onChange={ e => setTitle(e.target.value)} class="form-control" id='Title'/>
                </div>
                <div  className='form-group'> 
                    <label type='text'className = "text-right">رابط الصورة</label>
                    <input  value={photo} onChange={ e => setPhoto(e.target.value)} class="form-control" />
                </div>
                <div className='form-group'>
                    <label  className = "text-right"> المقال</label>
                    <textarea value={full} onChange={ e => setFull(e.target.value)} class="form-control" ></textarea>
                </div>
                <div className='form-group' >
                    <label className = "text-right"> الكمية المتوفرة</label>
                    <input type='text' value={link} onChange={ e => setLink(e.target.value)}  class="form-control" />
                </div>
                <div className='form-group' >
                    <label className = "text-right"> السعر شامل الضريبة</label>
                    <input type='text' value={price} onChange={ e => setPrice(e.target.value)}  class="form-control" />
                </div>

        <label  className = "text-right">النوع</label>
        
                <Form.Select defaultValue="T-Shirt" id='category' onChange={e=>setCategory(e.target.value)} value={category}>
                <option className='text-right' >أختر التصنيف</option>

        <option value='T-Shirt'>T-Shirt</option>
        <option value='Pants' > Pants</option>
        <option value='Shoes'>Shoes</option>
        <br></br><br></br><br></br>
      </Form.Select>
      {category==="T-Shirt"&&<Form.Select id='size' onChange={e=>setSize(e.target.value)} value={size}>
      <br></br>
      <option className='text-right' >أختر المقاس</option>

        <option value='T-Shirt'>S</option>
        <option value='Pants' > M</option>
        <option value='Shoes'>L</option>
      </Form.Select>}
      <br></br><br></br>

      {category==="Pants"&&<Form.Select id='size' onChange={e=>setSize(e.target.value)} value={size}>
      <option value='28'>28</option>
      <option value='29'>29</option>

        <option value='30'>30</option>
        <option value='31' > 31</option>
        <option value='32'>32</option>
        <option value='33'>33</option>
        <option value='34'>34</option>

      </Form.Select>}
<br></br>               
<br></br> 
                <Button className='submit' type='submit' variant='dark'>Submit</Button>
                <Button className='cancel' variant='dark'>Cancel</Button>
                




            </form>
            
            {props.children}

        </div>




    </div>
    </> 
  )
  
  else{
    return (<>
<NavBar/>
    <alert>You are not athuroiezed</alert></>
    )    
  }
}

export default AddStore