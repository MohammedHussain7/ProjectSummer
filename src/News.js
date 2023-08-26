import { useEffect, useState } from 'react';
import { db } from "./DB/lib/init-firebase";
import { collection, getDocs , getDoc , doc, deleteDoc } from "firebase/firestore";
// import "bootstrap/dist/css/bootstrap.min.css";
import './News.css'
import AddNew from './AddNew';
import DeleteConfirmation from './DeleteConfirmation';
import Footer from './component/Footer';
import NavBar from './component/NavBar';
import emailjs from '@emailjs/browser';

import { MDBIcon } from 'mdb-react-ui-kit';
import plus from './component/images/plusREACT.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
function News() {

  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
const [check , setCheck] = useState(false);
const navigate = useNavigate();


  const [thenew, setThenew] = useState([]);
  const [isTrue , setIstrue]= useState(false)
  


  useEffect(() => {
    getNews();
    console.log(thenew);
  }, []);
  if (currentUser){
    const ref = doc(db, "Users",currentUser.email);
      
      const docSnap =  getDoc(ref).then(value=>{
          if (value.data().news==="1"){
              setCheck(true)
          }
          else{
              setCheck(false)
          }
      });}
  const NewsDB = collection(db, "News");

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



  
  const [type, setType] = useState(null);
  const [idDelete, setIDdelete]= useState(null);
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [fruitMessage, setFruitMessage] = useState(null);

 
  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    
    setDeleteMessage(`Are you sure you want to delete the New? `);
   
 
    setDisplayConfirmationModal(true);
  };
 
  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
 
  // Handle the actual deletion of the item
  const submitDelete = ( id) => {
      setFruitMessage(`The New was deleted successfully.`);
      setIDdelete(id)
    deleteDoc(doc(db, "News", id)).then(()=>{


    })
    
   
    setDisplayConfirmationModal(false);
    
  };


 


  return (
    

    
    <div>
   
    <NavBar/>
    <div className='down'></div>
   
    {check&&<Button variant="dark" size="lg" onClick={()=>{navigate("/Add")}} >
        إضافة خبر
      </Button>}
      <br></br>
      <br></br>

    <div >       {fruitMessage && <Alert variant="success" id={idDelete}>{fruitMessage}</Alert>}


    <Row xs={1} md={2} className="g-4">

    {thenew.map(thene =>
    <>

<Col key={thene} className='CARDS'>
<Card className='Cards'
key={'Dark'}
text={'white'}
bg={'dark'}

>
      <Card.Img variant="top" src={thene.data.photo} />
      <Card.Body>
        <Card.Title id={thene.id}>{thene.data.Title}</Card.Title>
        <Card.Text id={thene.id}>{thene.data.full}
        </Card.Text>
        <Button variant="light" href={thene.data.link} target='_blank'>اقرأ المزيد</Button>
        {check&& <MDBIcon className='leftCor text-danger cursor' fas icon="trash-alt "  onClick={() => showDeleteModal( thene.id)}  />}
      </Card.Body>
    </Card>
    </Col>
       </>

       
       )}</Row>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage}  />
       </div>
       <Footer/>
    </div>
    

  );
};

export default News;

