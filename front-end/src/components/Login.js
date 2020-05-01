import React, { useState} from "react";
import { Link } from "react-router-dom";


import * as Yup from "yup";



const initialFormValues = {
  //text inputs
  username: "",
  email: "",
  password: "",
};

//Validates errors object
const initialFormErrors = {
  username: "",
  password: "",
  email: "",
};

//Schema for validation
const formSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Must be more than 3 characters")
    .required("Must include email address."),

  email: Yup.string()
    .email("Invalid email address.")
    .required("Must include email address."),

  password: Yup.string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),

 
});

export default function Login(props) {
const {onSubmit, disabled, signIn} = props
  //Sets state prop for `users`


  const [formValues, setFormValues] = useState(initialFormValues);


 

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  

  const onInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        // clears errors
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        // sets form errors
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <form className="Forms" onSubmit={onSubmit}>
      <header>
      <Link to="./Register">SignUp</Link>
      </header><h2>Login</h2>  

     
      

          <label className="FormLabel" htmlFor="username"></label>
          <input
            type="text"
            id="username"
            className="FormInput"
            placeholder="Username"
            name="username"
            onChange={onInputChange}
          />
   

          <label className="FormLabel" htmlFor="email"></label>
          <input
            type="text"
            id="email"
            className="FormInput"
            placeholder="Email"
            name="email"
            onChange={onInputChange}
          />
 


          <label className="FormLabel" htmlFor="password"></label>
          <input
            values="password"
            type="text"
            id="password"
            className="FormInput"
            placeholder="Password"
            name="password"
            onChange={onInputChange}
          />
 <div className="FormFarm">
          <button  onClick={signIn} disabled={disabled}>
            Continue</button>
   </div>
  

      

    </form>
  );
}
