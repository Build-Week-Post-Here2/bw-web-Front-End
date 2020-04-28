import React from "react";

function User({ details }) {
  return (
    <div className="User container">
      <p>User Name: {details.username}</p>
      <p>Password: {details.password}</p>
     
    </div>
  );
}

export default User;
