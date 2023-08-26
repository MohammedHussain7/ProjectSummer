import {React, useState} from 'react'
import NavBar from './component/NavBar'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { db } from "./DB/lib/init-firebase";

import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import Footer from './component/Footer'

function Appointment() {

    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [check,setCheck]= useState(false);
    const ref = doc(db, "Users",currentUser.email);
    
    const docSnap =  getDoc(ref).then(value=>{
        if (value.data().appointment==="1"){
            setCheck(true)
        }
        else{
            setCheck(false)
        }
    });

  return (
    <>
    <NavBar/>
    <br></br><br></br><br></br>


    <div className="d-grid gap-2">
      {!check&&<Button variant="dark" size="lg" onClick={()=>{navigate("/complain")}} >
        شكوى
      </Button>}
      {!check&&<Button variant="dark" size="lg"onClick={()=>{navigate("/createAppointment")}}>
        حجز موعد
      </Button>}
      {check&& <Button variant="dark" size="lg" onClick={()=>{navigate("/complainsAll")}}>
        عرض الشكاوى
      </Button>}
      {check&& <Button variant="dark" size="lg" onClick={()=>{navigate("/allAppointment")}}>
        عرض المواعيد
      </Button>}
    </div>
    <br></br><br></br><br></br>
<Footer/>
    
    
    </>
  )
}

export default Appointment