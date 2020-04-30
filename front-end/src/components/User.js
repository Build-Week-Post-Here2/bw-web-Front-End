import React from "react"
import { Link } from "react-router-dom";
export default function User({details}) {
  if (!details) {
    return <h3>Reteiving info...</h3>
  }
  return (
    <div>
      <h2></h2>
      <h2>{details.username}</h2>
      <p>Email: {details.email}</p>
      <p>password: {details.password}</p>
      {

        
        details.users.map(user =>{
          return(
             <div key={details.id}> {details.name}  <Link to= '/users'> user details</Link></div>
          )
        
        })
      }
      

    </div>
  )
}
