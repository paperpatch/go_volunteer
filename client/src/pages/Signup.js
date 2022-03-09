import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link"><Link to="/signup">Signup</Link></a> */}
              <a className="nav-link active" href="/signup">Signup</a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>
        </div>

        <form className="w-75 mx-auto my-4" onSubmit={handleFormSubmit}>

        <div className="form-group my-3">
          <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
        </div>
        
        <div className="form-group my-3">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>


         
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>



      {/* <Link to="/login">← Go to Login</Link> */}

      {/* <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
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

export default Signup;
