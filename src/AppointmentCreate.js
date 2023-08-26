import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays } from 'date-fns';
import { db } from "./DB/lib/init-firebase";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import { useRef } from 'react';
import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
function AppointmentCreate() {
    const [email , setEmail] = useState();
    const [name , setName] = useState();

    const [full, setFull] = useState();
    const [thenewone, setThenew] = useState([]);
    const navigate = useNavigate();
    const form = useRef();

    // const dateArray =[]
    // const ref1 = doc(db, "Appointments",currentUser.email);
    // const docSnap2 =  getDoc(ref1).then(value=>{
    //     dateArray.push(value.data().date)
    // });
    const NewsDB = collection(db, "Appointments");
    


    function getNews() {getDocs(NewsDB)
      .then((response) => { 
        const nws = response.docs.map((nw) => ({
          
          data: nw.data(),
          id: nw.id, 
        }));
        setThenew(nws);
        console.log(thenewone.at(0).data.date)
      })
      .catch((error) => {
        console.log(error);
      });} 
  
      useEffect(() => {
        getNews();
        console.log(thenewone);
      }, []);
    const weekend = (date) => new Date() < date
    const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
    const [appo , setAppo]= useState("")
    const ref = doc(db, "Users",currentUser.email);
    const docSnap =  getDoc(ref).then(value=>{
        setEmail(value.data().email)
        setAppo(value.data().appointment)
        // setName(value.data().name)
    });
    function handleSubmit(e){

      

      
        e.preventDefault()
        if ((full==="" ) || (startDate==="")){
            return alert("لازم تحط تاريخ و وصف")
        }
        emailjs.sendForm('service_zzezta7', 'template_ddycjkb', form.current, 'm0laIRxYzZJ2DBQ-W')
          .then((result) => {
              console.log(result.text);
        const newsRef = collection(db, "Appointments")
        addDoc(newsRef, {
            date:startDate,
            email:email,
            describe:full ,
            close:false
        }).then(response =>{
            console.log(response)
            navigate("/appointment")
        }).catch(error=>{
            console.log(error.message)
        })
        alert(startDate) }).catch(e=>{console.log(e)})
    }
    const isWeekday =  (date) => {
        const day = date.getDay()
        return ( day !== 6 && day !== 5)
      }
      const [startDate, setStartDate] = useState(new Date());

    if(currentUser&& appo==="0"){
      return (
        <> 
        <NavBar/>
        <br></br>

<div class="card">
  <div class="card-header">
    أحجز موعد
  </div>
  <div class="card-body">
  <section>
        <div className='container'>
            <br></br>
    <form onSubmit={handleSubmit} ref={form} className='--card'>


    <label className = "text-right col-xs-6 col-md-4" htmlFor='date' id='date'>الوقت: </label>
<input  value={email} name='email' id='email' onChange={e=>setEmail(e.target.value)}></input>
{/* <input value={emailS} onChange={e => setEmailS(e.target.value)}></input> */}
    <DatePicker
    id='startDate'
    value={startDate}
    name='startDate'
    onChangeRaw={e => setStartDate(e.target.value)}
    className="col-xs-12 col-sm-6 col-md-8"
          filterDate={isWeekday}
          selected={addDays(startDate,1) }
          
            startDate={addDays(new Date(),1)}
            minDate={addDays(new Date(),1)}
            maxDate={addDays(new Date(), 15)}
            showTimeSelect
            minTime={new Date(0, 0, 0, 7, 30)}
        maxTime={new Date(0, 0, 0, 14, 30)}
        excludeDates={thenewone}
          />
          <br></br>
          <br></br>

    <label className = "text-right col-xs-6 col-md-4" htmlFor='message'>وصف الموعد</label>
    <textarea name="message" className="col-xs-12 col-sm-6 col-md-8" id="message" value={full} onChange={ e => setFull(e.target.value)}/>
    <br></br>
    <input type="submit" className='col-xs-6 col-sm-4' value="ارسل" />
  </form>
  </div>
  </section>
  </div>
</div>



<br></br>
<br></br>
<Footer/>

        </>
      );}
      else{
        <>
        <Alert>You can't access here</Alert>
        {navigate("/")}        
        </>
      }
}

export default AppointmentCreate