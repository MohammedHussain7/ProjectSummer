import "./NavBar.css";
import logo from "./images/B1.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../DB/lib/init-firebase";
import { addDoc, collection, getDocs ,doc,getDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button } from "react-bootstrap";
const NavBar = () => {
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [name, setName] = useState();
  const [check, setCheck] = useState(false);

  const { openCart, cartQuantity } = useShoppingCart();
  
  if(currentUser){
    const ref = doc(db, "Users",currentUser.email);
    
    const docSnap =  getDoc(ref).then(value=>{
        setName(value.data().name)
        setCheck(true)

    });

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="container d-flex justify-content-center">
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-3">
              <a className="navbar-brand" href="/">
                <img
                  id="MDB-logo"
                  src={logo}
                  alt="MDB Logo"
                  draggable="false"
                  height="60"
                />
              </a>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                       {cartQuantity > 0 && (
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={openCart}
            
          >

<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
  <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  
</svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-item-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          </Button>
        )}
                <ul className="navbar-nav align-items-center mx-auto">
                  <li className="nav-item">
                    <a className="nav-link mx-2" href="/">
                    الأخبار <i className="far fa-newspaper pe-2"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mx-2" href="/appointment">
                    مواعيد و شكاوى <i className="far fa-calendar-check pe-2"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mx-2" href="/store">
                    متجر <i className="fas fa-store pe-2"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    {!check&&<a className="nav-link mx-2" href="/login">
                      <i className="fas fa-heart pe-2"></i>Login
                    </a>}
                  </li>
                  <li className="nav-item">
                    {check&&<a className="nav-link mx-2" href="/Dashboard">
                    مرحباً {name}  <i className="fas fa-heart pe-2"></i>
                    </a>}
                  </li>
           
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <a href="#" className="navbar-brand">
          DemoTech
        </a>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav> */}
    </>
  );
};

export default NavBar;
