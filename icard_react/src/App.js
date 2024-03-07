import React from 'react';
import {ToastContainer} from "react-toastify";
import {Navigation} from "./routes";
import {AuthProvaider} from "./context";



export default function App() {
  return (
    <AuthProvaider>
      <Navigation/>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
   </AuthProvaider>
  )
}
