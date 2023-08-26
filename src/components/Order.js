import React, { useEffect, useState } from 'react'
import NavBar from '../component/NavBar'
import { useAuth } from '../context/AuthContext'
import {db} from '../DB/lib/init-firebase'
import { collection, getDocs } from 'firebase/firestore';
import { Card, Col, Row } from 'react-bootstrap';
function Order() {
    const {currentUser} = useAuth();
    
    const [thenew, setThenew] = useState([]);
    const [order, setOrder] = useState([]);
    useEffect(()=>{
        getNews();
    },[])
    const NewsDB = collection(db, "Buyer-info "+currentUser.email);

    function getNews() {
      getDocs(NewsDB)
        .then((response) => { 
          const nws = response.docs.map((nw) => ({
            
            data: nw.data(),
            id: nw.id, 
          }));
          setThenew(nws);
          
          // console.log(order)
        })
        .catch((error) => {
          console.log(error);
        }); 
    }
  return (
    <>
    <NavBar/>
    <div className='mt'>
        <div className='mb-2'>

        <Row xs={1} md={2} className="g-4">

{thenew.map(thene =>
<>

<Col key={thene} className='CARDS'>
<Card className='Cards'
key={'Dark'}
text={'white'}
bg={'dark'}

>
  <Card.Title>{thene.data.CartCon.at(0).ProductName}</Card.Title>
  <Card.Body>
   
   
  </Card.Body>
</Card>
</Col>
   </>

   
   )}</Row>




        </div>



    </div>
    
    
    
    
    
    </>
  )
}

export default Order