import React, { useState, useEffect } from "react";
import "./App.css";


//imported Form into your `App.js` file, and placed the component in JSX.
import User from "./components/User"
import LoginForm from "./components/LoginForm";




import * as Yup from "yup";



const initialFormValues = {
  //text inputs
  username: '',
  email:'',
  password:'',

  
}

const initialFormErrors = {
  username: '',
  email:'',
  password:'',
  

}

const formSchema = Yup.object().shape({

  username: Yup
  .string()
    .min(3,"Must be more than 3 characters")
    .required("Must include email address."),

  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Must include email address."),

  password: Yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),

  terms: Yup
    .boolean()
    .oneOf([true], "You must accept Terms and Conditions")
    // required isn't required for checkboxes.
});


export default function App() {

  const [formValues, setFormValues] = useState(initialFormValues)

  //state will kepp track of whether submit button is disabled!
  const [formDisabled, setFormDisabled] = useState(true)

  //will allow state to keep track of validation errors
  const [formErrors, setFormErrors] =useState(initialFormErrors)




  //POST request 
  

//Set state property called `users` 
const [users] = useState([])

useEffect(() => {
  // runs validation and use them to enable/disable the submit button
  formSchema.isValid(formValues)
    .then(valid => { // either true or false
      setFormDisabled(!valid)
    })
}, [formValues])

const onSubmit = evt => {
  evt.preventDefault()

  const newUser = {
    username: formValues.username,
    email: formValues.email,
    password: formValues.password,
    
  }


}

const onInputChange = evt => {
  const name = evt.target.name
  const value = evt.target.value

  Yup
  .reach(formSchema, name)
  .validate(value)
  .then(valid => {

    // CLEAR ERROR
    setFormErrors({
      ...formErrors,
      [name]: '',
    })
  })
  .catch(err => {
    // SETTING FORM ERRORS
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

const onCheckboxChange = evt => {
  const { name } = evt.target
  const isChecked = evt.target.checked

  setFormValues({
    ...formValues,
    terms: {
      ...formValues.terms,
      [name]: isChecked,
    }
  })
}


return (
  <div className='container'>
  

    {users.map((user) => {
        return <User key={user.id} details={user} />;
      })}


    <LoginForm

      values={formValues}
      onInputChange={onInputChange}
      onCheckboxChange={onCheckboxChange}
      onSubmit={onSubmit}
     disabled={formDisabled}
      errors={formErrors}
    />
  

  {
    users.map(user => {
      return (
        <div>
          <h2>{user.name}</h2>
        </div>
      )
    })
  }
    </div>

  )
}
