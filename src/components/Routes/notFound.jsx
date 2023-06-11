import React from 'react'
import { Link } from 'react-router-dom'
import "./spin.css"
const NotFound = () => {
  return (
    <div className='nfp'>
      <p> opps !! you have visited wrong page<br />
      404 NotFound </p>
      <Link to={"/"} style={{color:"blue",borderBottom:"1px solid black"}} >GO BACK</Link>

    </div>
  )
}

export default NotFound
