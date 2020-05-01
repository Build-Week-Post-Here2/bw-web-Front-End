import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const url = "https://post-here-subreddit.herokuapp.com/api/auth/login";

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
  const { onSubmit, disabled } = props;
  //Sets state prop for `users`
  const { post } = useState([]);
  const [formValues, setFormValues] = useState(FormValues);

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  // axios
  axios.get(url).then(
    (response) => {
      console.log(response.data);
    },
    (error) => {
      console.log(error);
    }
  );
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
      </header>

      <div className="errors">
        {formErrors.username}
        {formErrors.email}
        {formErrors.password}
      </div>

      <h2>Login</h2>

      <label className="FormLabel" htmlFor="username"></label>
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
        className="formInput"
        placeholder="email"
        name="email"
        onChange={onInputChange}
      />

      <label className="FormLabel" htmlFor="password"></label>
      <input
        value={formValues.password}
        type="text"
        id="password"
        className="formInput"
        placeholder="password"
        name="password"
        onChange={onInputChange}
      />
      <div className="FormFarm">
        <button onClick={onSubmit} disabled={disabled}>
          Continue
        </button>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
    </form>
  );
}
