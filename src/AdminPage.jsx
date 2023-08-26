import React, {useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './AdminPage.css'
import { useAuth } from './context/AuthContext';
import { db } from "./DB/lib/init-firebase";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import { Alert } from 'react-bootstrap';

function AdminPage() {
    const navigate = useNavigate();

    const { proNews , proAppointment,proShop } = useAuth();
    const [check , setCheck]= useState('')
    const [check1 , setCheck1]= useState('')
    const { currentUser, updateUserPassword, updateUserEmail } = useAuth();

    const [check2 , setCheck2]= useState('')


    const [email , setEmail] = useState("")
    const [type , setType] = useState("")
    const [enable , setEnable] = useState("0")

    const ref = doc(db, "Users",currentUser.email);
    
    const docSnap =  getDoc(ref).then(value=>{
        if (value.data().appointment==="1"){
            if (value.data().shop==="1"){
                if (value.data().news==="1"){
                    setCheck("1")
                }
            }
        }
        else{
            setCheck("0")
        }
    });
   

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("email", email)
        console.log(type)
        try {
            if (type==="news"){
                console.log("i AM")
                await proNews(email, enable);
                console.log("Hi")
                navigate("/");
            }
            if (type==="appointment"){
                await proAppointment(email, enable);
                navigate("/");
            }
            if (type==="shop"){
                await proShop(email, enable);
                navigate("/");
            }
          
        } catch {
        }
      }

      
if (     currentUser && check==="1"){
  return (

    <Form onSubmit={handleSubmit}>
      
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
        
      >
        <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} value={email}
                        required
                        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Works with selects">
      <Form.Select aria-label="Floating label select example" onChange={e => setType(e.target.value)} value={type} required
>
        <option value="news">News</option>
        <option value="appointment">Appointment</option>
        <option value="shop">Shop</option>
      </Form.Select>
    </FloatingLabel>
    <br></br>
    <FloatingLabel controlId="floatingSelect" label="Enable?">
      <Form.Select aria-label="Floating label select example" onChange={e => setEnable(e.target.value)} value={enable}            required
>        <option value="0" defaultValue={"0"}>Disable</option>

        <option value="1">Enable</option>
      </Form.Select>
    </FloatingLabel>    <br></br>
    <Button variant="dark" type='submit'>Submit</Button>
</Form>
    )
  }
  else{
    <Alert>
        You are not authorized
    </Alert>
  }
}

export default AdminPage