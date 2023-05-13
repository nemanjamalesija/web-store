import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../constants/baseURL';
import { logInUser } from '../reducers/authReducer';
import { useAppDispatch } from '../hooks/useAppDispatch';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${baseURL}/users/login`,
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
      const {
        data: { data },
      } = response;

      const { _id, email: userEmail, name, role } = data.user;

      dispatch(
        logInUser({
          _id,
          email: userEmail,
          name,
          role,
          token: response.data.token,
        })
      );

      localStorage.setItem('token', response.data.token);
      navigate(`/products`);
    } catch (error: any) {
      console.log(error.response.data.message);
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
