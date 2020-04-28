//[ ] Created component file called `Form.js`, imported it into your `App.js` file, and place the component in your JSX there.

import React from "react";

function LoginForm(props) {
  const { values, onInputChange, onSubmit, errors } = props;

  return (
    <form className="user container" onSubmit={onSubmit}>
      <div className="errors">
        {errors.username}
        {errors.email}
        {errors.password}
      </div>

      <div>
      <h2>Login</h2>
        <label>
          Username:&nbsp;
          <input
            value={values.username}
            onChange={onInputChange}
            name="username"
            type="text"
          />
        </label>

        <label>
          Email:&nbsp;
          <input
            value={values.email}
            onChange={onInputChange}
            name="email"
            type="email"
          />
        </label>

        <label>
          Password:&nbsp;
          <input
            value={values.password}
            onChange={onInputChange}
            name="password"
            type="password"
          />
        </label>
      </div>

     
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
