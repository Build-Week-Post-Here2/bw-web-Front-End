import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

const url = "https://post-here-subreddit.herokuapp.com/api/auth/register"

const FormValues = {
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

  const [formValues, setFormValues] = useState(FormValues);

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [FormDisabled, setFormDisabled] = useState(true);
  const [post, SetPost] = useState([]);

  const sentData = { data: "Your data has been submitted" };

  axios
    .post(url, sentData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const [users] = useState([]);

  const postUser = (user) => {
    axios
      .post(url, user)
      .then((res) => {
        SetPost([...users, res.data]);
      })
      .catch((err) => {
        debugger;
      });
  };
  useEffect(() => {
    // runs validation and use them to enable/disable the submit button
    formSchema.isValid(formValues).then((valid) => {
      // either true or false
      setFormDisabled(!valid);
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
    setFormValues(FormValues);
  };

  const onInputChange = (evt) => {
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

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  // console.log("error->", formErrors.username);
  return (
    <form className="Form" onSubmit={onSubmit}>
      <header>
        <Link to="/Login">Sign in</Link>
      </header>
      <div className="errors">
        {formErrors.username}
        {formErrors.email}
        {formErrors.password}
      </div>
      <h3>Become a member</h3>

      <small>Create your account</small>

      <label className=" FormLabel" htmlFor="username"></label>
      <input
        value={formValues.username}
        type="text"
        id="username"
        className="formInput"
        placeholder="username"
        name="username"
        onChange={onInputChange}
      />

      <label className="FormLabel" htmlFor="email"></label>
      <input
        value={formValues.email}
        type="text"
        id="email"
        className="FormInput"
        placeholder="Email"
        name="email"
        onChange={onInputChange}
      />

      <label className="FormLabel" htmlFor="password"></label>
      <input
        value={formValues.password}
        type="text"
        id="password"
        className="FormInput"
        placeholder="Password"
        name="password"
        onChange={onInputChange}
      />

      <button onClick={onSubmit} onChange={onSubmit} disabled={FormDisabled}>
        Create Account
      </button>

      <div className="terms">
        By clicking submit, you agree to <Link to="/">Terms of Use.</Link>
      </div>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
}
