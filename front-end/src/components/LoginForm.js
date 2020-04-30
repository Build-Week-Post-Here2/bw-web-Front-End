import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import "../components/Styles.less";
import axios from "axios";
import * as Yup from "yup";
import Register from "../components/Register";

const url = "https://post-here-2.herokuapp.com";

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

  terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

export default function LoginForm(props) {
  //Sets state prop for `users`
  const [users, setUsers] = useState([]);
  const [postUser, setPostUser] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const { errors, values } = props;
  //state will kepp track of whether submit button is disabled!
  const [disabled, setDisabled] = useState(true);

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const getUsers = () => {
    // Fetches user from the api and sets them in state

    axios
      .get(url)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(users);
      });
  };

  useEffect(() => {
    // getting users from APi!
    getUsers();
  }, []);

  // const [post, setPost] = useState([]);
  useEffect(() => {
    // runs validation and use them to enable/disable the submit button
    formSchema.isValid(formValues).then((valid) => {
      // either true or false
      setDisabled(!valid);
    });
  }, [formValues]);

  const onSubmit = (evt) => {
    evt.preventDefault();

    const newUser = {
      username: formValues.username,
      password: formValues.password,
      email: formValues.email,
    };

    setPostUser(newUser);
    setFormValues(initialFormValues);
  };

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
      <header></header>

      <div className="Login_Container">
        <h2>Login</h2>

        <div className="FormField">
          <label className="FormLabel" htmlFor="username"></label>
          <input
            type="text"
            id="username"
            className="FormInput"
            placeholder="Username"
            name="username"
            onChange={onInputChange}
          />
        </div>

        <div className="FormField">
          <label className="FormLabel" htmlFor="email"></label>
          <input
            type="text"
            id="email"
            className="FormInput"
            placeholder="Email"
            name="email"
            onChange={onInputChange}
          />
        </div>

        <div className="FormField">
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

          <div className="btn">
            <button onClick={onSubmit} disabled={disabled}>
              Continue
            </button>
          </div>
        </div>
      </div>

      <div>
        <Link to="./Register">SignUp</Link>
      </div>
    </form>
  );
}
