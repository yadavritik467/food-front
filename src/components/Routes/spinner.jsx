// import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import "./spin.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loader from "../UI/Loader";
function Spiner() {
  const[auth] = useAuth()
    const [counter,setCounter] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCounter((count)=> --count)
        },1000)
        counter === 0 && navigate("/login",{
            state:location.pathname
        })
        return ()=>{clearInterval(interval)}

    },[counter,navigate,location])
  return (
   <div  className="spin">
    {!auth.user ? ( <p> You must login first <br /> let us redirect you to the login page in sec {counter}  </p>):(<Loader/>)}

   </div>
   
  );
}

export default Spiner;