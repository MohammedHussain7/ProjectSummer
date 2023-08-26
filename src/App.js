import React,{ Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import RequireAuth from "./context/RequireAuth";
import Dashboard from "./components/Dashboard";
import News from './News'
import Login from "./components/Login";
import { db  } from "./DB/lib/init-firebase";
import auth from "./DB/lib/init-firebase";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import AddNew from "./AddNew";
import AdminPage from "./AdminPage";
import Appointment from "./Appointment";
import Complain from "./Complain";
import ComplainsAll from "./ComplainsAll";
import AppointmentCreate from "./AppointmentCreate";
import AppointmentsAll from "./AppointmentsAll";
import AppontmentInd from "./AppontmentInd";
import ShoppingCartProvider from "./context/ShoppingCartContext";
import Test from "./Test";
// import Store from "./Store";
import Store from "./components/Store"
import AddStore from "./AddStore";
import NavBar from "./component/NavBar";
import { AddProducts } from "./components/AddProducts";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ProductsContextProvider } from "./GLOBAL/ProductsContext" ;
import {CartContextProvider} from "./GLOBAL/CartContext"
import { Cart } from "./components/Cart";
// import Cart from "./components/Cart";
import { Cashout } from "./components/Cashout";
import Order from "./components/Order";
// const App = () => {
  export class App extends Component {


  state = {
    user: null,
}

componentDidMount() {

    // getting user info for navigation bar

  //   const {currentUser} = useAuth();
    
  //   if(currentUser){
  //   const ref = doc(db,"Users",currentUser.email )
  //   const docSnap =getDoc(ref).then(value=>{
  //     this.setState({
  //       user: value.data().name
  //     })
  //   })}
  //   else {
  //     this.setState({
  //         user: null
  //     })
  // }


    //


    auth.onAuthStateChanged(user => {
        if (user) {

          const ref = doc(db, "Users",user.email);
    
          const docSnap =  getDoc(ref).then(value=>{
              this.setState({
                user: value.data().name
                
              })
      
          });
        
        }
        else {
            this.setState({
                user: null
            })
        }
    })

}

render(){
  return (
    <Container
      className="d-flex align-items-center justify-content-center text-end"
      style={{ minHeight: "100vh" }}
    >
        
      <div  className="w-100"
      style={{ maxWidth: "1000px" }}
      >
             
        <Router>
        <ProductsContextProvider>  
                <CartContextProvider>

          <AuthProvider>

            <Routes>
              <Route
                path="/"
                element={
                    <News />
                }
              />
              <Route 
                path="/Add"
                element={<RequireAuth>
                    <AddNew/>
                </RequireAuth>
                }
                />
                <Route 
                path="/AddStore"
                element={<RequireAuth>
                    <AddStore/>
                </RequireAuth>
                }
                />
                <Route 
                path="/Dashboard"
                element={<RequireAuth>

                    <Dashboard/>
                </RequireAuth>
                }/>
                <Route path='/cashout' component={() => <Cashout user={this.state.user} />} />

                <Route 
                path="/appointment"
                element={<RequireAuth>

                    <Appointment/>
                </RequireAuth>
                }/>
                <Route 
                path="/complain"
                element={<RequireAuth>

                    <Complain/>
                </RequireAuth>
                }/>
                <Route 
                path="/complainsAll"
                element={<RequireAuth>

                    <ComplainsAll/>
                </RequireAuth>
                }/>
                <Route 
                path="/createAppointment"
                element={<RequireAuth>

                    <AppointmentCreate/>
                </RequireAuth>
                }/>
                <Route 
                path="/AllAppointment"
                element={<RequireAuth>

                    <AppointmentsAll/>
                </RequireAuth>
                }/>
                <Route 
                path="/Appoint"
                element={<RequireAuth>

                    <AppontmentInd/>
                </RequireAuth>
                }/>
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin" element={<AdminPage />} />

              <Route path="/store1" element={<Cashout user />      } />
              <Route path="/orders" element={<Order />      } />


              <Route path="/store" element={<Store user />      } />
              <Route path="/cartproducts" element={<Cart user />     } />

              {/* <Route path="/cartproducts" component={() => <Cart user={this.state.user} />} /> */}


            </Routes> 
          </AuthProvider>

          </CartContextProvider>

          </ProductsContextProvider>

        </Router>
      </div>
    </Container>
  );
};}

export default App;



