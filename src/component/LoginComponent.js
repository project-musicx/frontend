
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function LoginComponent(){
    let navigate = useNavigate();
    console.log(navigate)
    function handleCallBackResponse(response){
        var user_object= jwt_decode(response.credential)
        console.log(response,user_object)
        navigate("./home", { replace: true });
          }
        
          useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
          client_id:"38238582225-hje5o3llosp9rdeqhr09v57u3jhdpjqq.apps.googleusercontent.com",
          callback:handleCallBackResponse
        })
        google.accounts.id.renderButton(
          document.getElementById("sign-in"),
          {theme:"outline",size:"large"}
        )
          },[])
        
        function loginWithGoogle(){
          axios.post("/api/auth/login", { withCredentials: true }).then((result)=>{
            console.log("succes")
          }) 
        }
        
    return (
        <div className="login-box">
        
       <div className="login-component">
       <div className="title-of-compoent">Login To Micxy</div>
       <div id="sign-in"></div>
          </div>
        </div>
    )
}
export default LoginComponent