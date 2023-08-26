import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import { db } from "./DB/lib/init-firebase";
import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Complain() {
    const form = useRef();
    const navigate = useNavigate();
    const [name, setName]= useState("")
    const [email , setEmail] = useState("")
    const [title , setTitle] = useState("")
    const [full, setFull]= useState("")
    const { currentUser, logout } = useAuth();
    const [check,setCheck]= useState(false);
    const sendEmail = (e) => {
        
        e.preventDefault();
    
        emailjs.sendForm('service_zzezta7', 'template_yhi6xjm', form.current, 'm0laIRxYzZJ2DBQ-W')
          .then((result) => {
              console.log(result.text);
              const newsRef = collection(db, "Complains")
        addDoc(newsRef, {
            name:name,
            email:email,
            full:full,
            title:title    
        }).then(response =>{
            console.log(response)
        }).catch(error=>{
            console.log(error.message)
        })
              alert("تم إرسال الشكوى, سوف نرد في أقرب وقت")
              navigate("/appointment")

          }, (error) => {
              console.log(error.text);
          });
      };
     
  return (
    <>
    <NavBar/>
    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
    <div class="card">
  <div class="card-header">
    أرسل شكوى
  </div>
  <div class="card-body">
  <section>
        <div className='container'>
            <br></br>
    <form ref={form} onSubmit={sendEmail} className='--card'>
    <label className = "text-right col-xs-6 col-md-4 " htmlFor='user_name' > الإسم</label>
    <input type="text"  name="user_name" className="col-xs-12 col-sm-6 col-md-8" value={name} onChange={ e => setName(e.target.value)} id="user_name" />
    <br></br>    <br></br>
    <label className = "text-right col-xs-6 col-md-4 " htmlFor='title' > العنوان</label>
    <input type="text"  name="title" className="col-xs-12 col-sm-6 col-md-8" value={title} onChange={ e => setTitle(e.target.value)} id="title" />
    <br></br>    <br></br>

    <label className = "text-right col-xs-6 col-md-4" htmlFor='email' id='email'>البريدالإلكتروني</label>
    <input type="email" className="col-xs-12 col-sm-6 col-md-8" name="subject"  value={email} onChange={ e => setEmail(e.target.value)}/>
    <br></br>    <br></br>

    <label className = "text-right col-xs-6 col-md-4" htmlFor='message'>وصف الشكوى</label>
    <textarea name="message" className="col-xs-12 col-sm-6 col-md-8" id="message" value={full} onChange={ e => setFull(e.target.value)}/>
    <br></br>
    <input type="submit" className='col-xs-6 col-sm-4' value="ارسل" />
  </form>
  </div>
  </section>
  </div>
</div>
<Footer/>
</> 
  )
}

export default Complain