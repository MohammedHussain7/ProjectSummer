import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { React, useContext, useState, useEffect, createContext } from "react";
import auth, { db } from "../DB/lib/init-firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password, nameI ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(

      async(result)=>{
        try{
          const docRef =  doc(db , "Users", result.user.email);          
          const data = {
            name: nameI,
            userID: result.user.uid,
            news:"0",
            appointment:"0"
            ,shop:"0",
            email:result.user.email
          }
          setDoc(docRef , data).then(()=>{
            console.log("Added ")
          }).catch(error =>{
            console.log("Here is error")
          })
        }
        catch(error){
          console.log(error)
        }
      }

      // async(result)=>{
      //   try{
      //     const docRef = await addDoc(collection(db , "Users"),{
      //       userID:result.user.email,
      //       name: nameI,
      //       userID: result.user.uid,
      //       news:"0",
      //       appointment:"0"
      //       ,shop:"0",
      //       email:result.user.email
      //     })
      //   }
      //   catch(error){
      //     console.log(error)
      //   }
      // }


    );
    
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const updateUserEmail = (email) => {
    return updateEmail(auth.currentUser, email);
  };
  const updateUserPassword = (password) => {
    return updatePassword(auth.currentUser, password);
  };
  const proNews = (email, enable)=>{
    const ref = doc(db, "Users",email);
    try{
      updateDoc(ref, {
        news:enable
      });
      
    }
    catch(error){
      console.log(error)
    }

  }
  const proShop = (email, enable)=>{
    const ref = doc(db, "Users",email);
    try{
      updateDoc(ref, {
        shop:enable
      });
      
    }
    catch(error){
      console.log(error)
    }

  }
  const proAppointment = (email, enable)=>{
    const ref = doc(db, "Users",email);
    try{
      updateDoc(ref, {
        appointment:enable
      });
      
    }
    catch(error){
      console.log(error)
    }

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        proNews,
        proAppointment,
        proShop
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
