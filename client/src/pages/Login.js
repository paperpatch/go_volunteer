import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 mt-5 pt-5">

      <div className="card mx-auto w-50">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="/login">Login</a>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link"><Link to="/signup">Signup</Link></a> */}
              <a className="nav-link" href="/signup">Signup</a>
            </li>
          </ul>
        </div>

        <form className="w-75 mx-auto my-4" onSubmit={handleFormSubmit}>

        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}

          <div className="form-group my-3">
            <label htmlFor="email" className="mb-2">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="youremail@test.com" onChange={handleChange}></input>
              {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="form-group my-3">
            <label  htmlFor="pwd" className="mb-2">Password</label>
            <input  name="password" type="password" className="form-control" id="pwd" placeholder="******" onChange={handleChange}></input>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      

      {/* <h2>Login</h2> */}
      {/* <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form> */}
    </div>



  );
}

export default Login;
