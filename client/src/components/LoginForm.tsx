import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3001';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = JSON.stringify(response.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <p className='' aria-live='assertive'></p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='email'
          id='email'
          autoComplete='off'
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          required
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button>Sign In</button>
        <div className='persistCheck'>
          <input type='checkbox' id='persist' />
          <label htmlFor='persist'>Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className='line'>Sign Up</span>
      </p>
    </section>
  );
};

export default LoginForm;
