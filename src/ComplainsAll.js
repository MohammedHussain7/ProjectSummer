import { useEffect, useState } from 'react';
import { db } from "./DB/lib/init-firebase";
import { collection, getDocs  ,doc ,getDoc , deleteDoc} from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
import './News.css'
import AddNew from './AddNew';
import Footer from './component/Footer';
import NavBar from './component/NavBar';
import plus from './component/images/plusREACT.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ComplainsAll() {
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
    const NewsDB = collection(db, "Complains");
  
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
   if (currentUser&& check==="1"){
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
            {thene.data.full}{' '}
          </p>
          <footer className="blockquote-footer " id={thene.id}>
            {thene.data.name} <br></br>
            {thene.data.email}
            <Button variant='light' size='sm' onClick={()=>{

deleteDoc(doc(db, "Complains", thene.id)).then(()=>{

  navigate("/complainsAll")   
  window.location.reload(true)


}).then(e=>{console.log(e)})
            }}>إغلاق الشكوى</Button>
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

export default ComplainsAll