import React, { useState, useEffect } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import "../components/Styles.less";
import axios from "axios";
import * as Yup from "yup";
import LoginForm from "../components/LoginForm";

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
export default function Register(props) {
  //Sets state prop for `users`
  const [postUsers, setPostUser] = useState([]);
  const [formValues, setFormValues] = useState(initialFormValues);

  //state will kepp track of whether submit button is disabled!
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  const postUser = (user) => {
    axios
      .post("https://post-here-2.herokuapp.com/users")
      .then((res) => {
        setPostUser([res.data, ...postUser]);
      })
      .catch((err) => {});
  };

  // const [post, setPost] = useState([]);
  useEffect(() => {
    // runs validation and use them to enable/disable the submit button
    formSchema.isValid(formValues).then((valid) => {
      // either true or false
      setButtonDisabled(!valid);
    });
  }, [formValues]);

  const onSubmit = (evt) => {
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
    <form className="Form" onSubmit={onSubmit}>
      <Link to="/LoginForm" className="RegLink">
        Sign in
      </Link>

      <h3>Become a member</h3>
      <div>
        <small>Create your account</small>
      </div>

      <div className="FormContainer">
        <div className="FormField">
          <label className=" FormLabel" htmlFor="name"></label>
          <input
            type="text"
            id="name"
            className="formInput"
            placeholder="username"
            name="name"
            onChange={onInputChange}
          />
        </div>

        <div className="FormField">
          <label className="FormLabel" htmlFor="name"></label>
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
          <label className="FormLabel" htmlFor="name"></label>
          <input
            type="text"
            id="password"
            className="FormInput"
            placeholder="Password"
            name="passoword"
            onChange={onInputChange}
          />
        </div>

        <div className="btn">
          <button onClick={onSubmit} disabled={disabled}>
            Continue
          </button>
        </div>

        <div className="terms">
          <small>
            By clicking submit, you agree to <Link>Terms of Use.</Link>
          </small>
        </div>
      </div>
    </form>
  );
}
