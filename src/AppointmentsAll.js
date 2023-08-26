import { useEffect, useState } from 'react';
import { db } from "./DB/lib/init-firebase";
import { collection, getDocs,getDoc, updateDoc ,doc } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
import './News.css'
import AddNew from './AddNew';
import Footer from './component/Footer';
import NavBar from './component/NavBar';
import plus from './component/images/plusREACT.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { useAuth } from './context/AuthContext';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

function AppointmentsAll() {
  const [check , setCheck]= useState('')
    const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
    const ref = doc(db, "Users",currentUser.email);
    const docSnap =  getDoc(ref).then(value=>{
        setCheck(value.data().news)
    });
    const navigate= useNavigate();

  


    const [thenew, setThenew] = useState([]);
    const [isTrue , setIstrue]= useState(false)
    useEffect(() => {
      getNews();
      console.log(thenew);
    }, []);
    const NewsDB = collection(db, "Appointments");
  
    function getNews() {
      getDocs(NewsDB)
        .then((response) => { 
          const nws = response.docs.map((nw) => ({
            
            data: nw.data(),
            id: nw.id, 
          }));
          setThenew(nws);
        })
        .catch((error) => {
          console.log("error.meassage");
        }); 
    }
   if(currentUser&&check==="1"){
    return (
      
  
      
      <>
      
     
      <NavBar/>
      <div className='down'></div>
     
      <div > 
      <Row xs={1} md={2} className="g-4">
  
      {thenew.map(thene =>
      <>
  
  <Col key={thene} className='CARDS'>
  <Card className='Cards'
  key={'Dark'}
  text={'white'}
  bg={'dark'}
  >
    <Card.Header id={thene.id}>{thene.data.title}</Card.Header>
    <Card.Body>
        <blockquote className="blockquote mb-0" id={thene.id}>
          <p>
            {' '}
            {thene.data.describe}{' '}
          </p>
          <p>
            {' '}
            <span>الوقت:     </span><t></t>
            <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" >{thene.data.date}</SimpleDateTime>
{' '}
<t></t><p id={thene.id}>  حالة الموعد :{thene.data.close?"مغلق":"جاري"}</p>
          </p>
          {thene.id && thene.data.close===false?  <Button type='submit' variant='light' onClick={()=>{
            

            
    const ref = doc(db, "Appointments",thene.id);
    
      updateDoc(ref,{close:true}).then(()=>{
        
        
        navigate("/AllAppointment")
        window.location.reload(true)

      }).catch(error=>{console.log(error)})


          }}>إقفال الموعد</Button >:<br></br>}
          
<br></br><br></br>
          <footer className="blockquote-footer " id={thene.id}>
            {thene.data.email}
          </footer>
        </blockquote>

      </Card.Body>
      </Card>
      </Col>
         </>
  
         
         )}</Row>
         </div>
      <Footer/>
      </>
  
    );}
    else{
      navigate("/")
    }
    
  
}

export default AppointmentsAll