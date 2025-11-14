import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
// import Loading from "../components/Loading";
//-------------------import Zone----------//

export const AuthContext =  createContext();


//-------------------------//


const auth = getAuth(app);



 //===========Provider Boundary=============//
const AuthProvider = ({ children }) => {
    {/* User SetUser */}
  const [user, setUser] = useState(null);


//===========User Loading =============//

const [loading,setLoading] = useState(true)



 //===========Create User=============//

const createUser = (email,password) => {
  setLoading(true)
  return  createUserWithEmailAndPassword(auth,email,password)
}
 //===========SignIn=============//

 const logIn = (email,password) =>{
  setLoading(true)
  return signInWithEmailAndPassword(auth,email,password)
  
 }


// =========== Google Sign-In ===========
const googleProvider = new GoogleAuthProvider();

const googleLogin = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider);
};




 //===========User Profile Update=============//


const updateUser = (updatedData) =>{

  return updateProfile(auth.currentUser,updatedData)
}
//=========== Password reset ==========//
const resetPassword = (email) => {
  setLoading(true);
  return sendPasswordResetEmail(auth, email)
    .then(() => {

      setLoading(false);
    });
};


//-----Logout User=============//

  const logOut = () => {
    return signOut(auth);
  };



//---------------Observer Function=============//

useEffect(()=>{
const unSubscribe =  onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    setLoading(false);
});
  return()=>{
    unSubscribe()
  }
},[])

//--------Data Zone=============//

const authData ={
    user,
    setUser,
    createUser,
    logOut,
    logIn,
    updateUser,
    loading,
    setLoading,
     googleLogin, 
     resetPassword,
}
// if (loading){
//   return <Loading></Loading>
// }
//Context Provider 
  return <AuthContext value={authData}>{children}</AuthContext>;
};


export default AuthProvider;
