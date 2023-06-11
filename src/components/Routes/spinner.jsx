// import Spinner from 'react-bootstrap/Spinner';
import { useEffect, useState } from "react";
import "./spin.css"
import { useLocation, useNavigate } from "react-router-dom";
function Spiner() {
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
 <p> You must login first <br /> let us redirect you to the login page in sec {counter}  </p>
   </div>
   
  );
}

export default Spiner;