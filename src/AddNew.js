import React, { useState } from 'react'
import './AddNew.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { db } from "./DB/lib/init-firebase";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import { Alert } from 'react-bootstrap';
function AddNew(props) {
    const [title, setTitle]= useState('')
    const [link, setLink]= useState('')
    const [photo, setPhoto]= useState('')
    const navigate = useNavigate();

    const [full, setFull]= useState('')
    const [check , setCheck]= useState('')
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
        const newsRef = collection(db, "News")
        addDoc(newsRef, {
            Title:title,
            photo:photo,
            link:link,
            full:full      
        }).then(response =>{
            console.log(response)
            navigate("/")
        }).catch(error=>{
            console.log(error.message)
        })
        alert(title) 
    }
    if (currentUser && check==="1")
  return  (
    <div className='popup' >
        <div className='popup-inner'>
        <Link to={"/"}><button className="close-btn" >close</button></Link>
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
                    <label className = "text-right"> رابط المقال</label>
                    <input type='text' value={link} onChange={ e => setLink(e.target.value)}  class="form-control" />
                </div>
                <button className='submit'> submit </button>
                




            </form>
            
            {props.children}

        </div>




    </div>
    
  )
  else{
    return (
        
    <alert>You are not athuroiezed</alert>
    )    
  }
}

export default AddNew