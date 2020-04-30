import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles.less";
import axios from "axios";
import * as yup from 'yup'


const url ="https://post-here-subreddit.herokuapp.com/api/auth/register";

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
const formSchema = yup.object().shape({
  username: yup.string()
    .min(3, "Must be more than 3 characters")
    .required("Must include email address."),

  email: yup.string()
    .email("Invalid email address.")
    .required("Must include email address."),

  password: yup.string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),

  
});

export default function Register(props) {
  
  const {handleSubmit} = props
  //Sets state prop for `users`
const [user, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  //state will kepp track of whether submit button is disabled!
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [FormDisabled, setFormDisabled] = useState(true);

  const postUser = user => {
    axios
      .post(url, ...user)
      .then(res => {
        setUsers([res.data, ...user])
      })
      .catch(err => {
      })
  }



  // const [post, setPost] = useState([]);
  useEffect(() => {
    // runs validation and use them to enable/disable the submit button
    formSchema.isValid(formValues)
    .then(valid => {
      // either true or false
      setFormDisabled(!valid)
    })
  }, [formValues])

  const onSubmit = evt => {
    evt.preventDefault();

    const newUser = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
    };

    postUser(newUser);
    setFormValues(initialFormValues);
  };

  const onInputChange = (evt) => {
    const name = evt.target.username;
    const value = evt.target.value;


    yup
    .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        // clears errors
        setFormErrors({
          ...formErrors,
          [name]: '',
        })
      })
      .catch((err) => {
        // sets form errors
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
    <header>
      <Link to="/Login" >
        Sign in
      </Link>
    </header>

      

      <h3>Become a member</h3>
   
        <small>Create your account</small>
 

 
          <label className=" FormLabel" htmlFor="name"></label>
          <input
            type="text"
            id="name"
            className="formInput"
            placeholder="username"
            name="name"
            
            onChange={onInputChange}
          />
  


          <label className="FormLabel" htmlFor="name"></label>
          <input
            type="text"
            id="email"
            className="FormInput"
            placeholder="Email"
            name="email"
         
            onChange={onInputChange}
          />
    
          <label className="FormLabel" htmlFor="name"></label>
          <input
            type="text"
            id="password"
            className="FormInput"
            placeholder="Password"
            name="passoword"
         
            onChange={onInputChange}
          />
   

     
            <button  onClick={onSubmit} disabled={FormDisabled}>
            Continue
          </button>
     

          <div className= "terms">
            By clicking submit, you agree to <Link to="/">Terms of Use.</Link>
          </div>
  

    </form>
  );
}
