import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const url = "/auth/register";

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
  username: yup
    .string()
    .min(3, "Must be more than 3 characters")
    .required("Must include email address."),

  email: yup
    .string()
    .email("Invalid email address.")
    .required("Must include email address."),

  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),
});

export default function Register(props) {
  //Sets state prop for `users`
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
console.log('this is formValues', formValues)
  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [formDisabled, setFormDisabled] = useState(false);

  const postUser = (user) => {
    axiosWithAuth()
      .post(url, credentials)
      .then((res) => {
        console.log('this is the console log for the res in postUser', res)
        // localStorage.setItem('token');
      })
      .catch((err) => {});
  };

  // const [post, setPost] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  useEffect(() => {
    // runs validation and use them to enable/disable the submit button
    formSchema.isValid(credentials).then((valid) => {
      // either true or false
      setFormDisabled(!valid);
    });
  }, [credentials]);
  
  const newUser = {
    username: formValues.username,
    password: formValues.password,
    email: formValues.email,
  };
  console.log('this is newUser', newUser)
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log('this is new user', newUser)
    postUser(newUser);
    setFormValues(initialFormValues);
   
  };
  // const [userId, setUserId] = useState()
  // const signIn = e => {
    
  //   const newUser = {
  //     username: formValues.username,
  //     password: formValues.password,
  //     email: formValues.email,
  //   };
  //   // const userId = 
  //   e.preventDefault()
  //   axiosWithAuth()
  //   .post(url, )
  //   .then( res => {
  //     console.log(res)
  //   })
  // }

  const onInputChange = (evt) => {
    evt.preventDefault()
    const name = evt.target.name;
    const value = evt.target.value;

    yup
      .reach(formSchema, name)
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

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  // const handleChange = (e) => {
  //   e.preventDefault();

  // };
  console.log('this is onSubmit', onSubmit)
  return (
    <form className="Form" onSubmit={onSubmit}>
      <header>
        <Link to="/Login">Sign in</Link>
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
        value={credentials.username}
      />

      <label className="FormLabel" htmlFor="email"></label>
      <input
        type="text"
        id="email"
        className="FormInput"
        placeholder="Email"
        name="email"
        onChange={onInputChange}
        value={credentials.email}
      />

      <label className="FormLabel" htmlFor="password"></label>
      <input
        type="text"
        id="password"
        className="FormInput"
        placeholder="Password"
        name="password"
        onChange={onInputChange}
        value={credentials.password}
      />

      <button type='submit' disabled={formDisabled}>
        Create Account
      </button>

      <div className="terms">
        By clicking submit, you agree to <Link to="/">Terms of Use.</Link>
      </div>
    </form>
  );
}
