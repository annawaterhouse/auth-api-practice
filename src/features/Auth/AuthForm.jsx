/* TODO - add your code to create a functional React component that 
renders a login form */
/* TODO - add your code to create a functional React component 
that renders a registration form */
import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from './authSlice';
import { useNavigate } from 'react-router-dom';
import "./form.scss"

export default function AuthForm() {
    const navigate = useNavigate();

    // Swapping between login and register
    const [isLogin, setIsLogin] = useState(true);
    const authAction = isLogin ? 'Login' : 'Register';
    const altCopy = isLogin
      ? 'Need an account? Register here.'
      : 'Already have an account? Login here.';
  
    // Controlled form fields
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // Form submission
    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    /** Send the requested authentication action to the API */
    const attemptAuth = async (e) => {
      e.preventDefault();
  
      const authMethod = isLogin ? login : register;
      const credentials = isLogin ? { email, password } : { firstname, lastname, email, password };

      setError(null);
      setLoading(true);
  
      try {
        // We need to unwrap here if we want to catch the error
        const response = await authMethod(credentials).unwrap();
        console.log("token", response.token)
        navigate('/');
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    return(
        <>
        <h1>{authAction}</h1>
        <form onSubmit={attemptAuth}>
        {!isLogin && (
            <><label>
            Firstname
            <input
              type="text"
              value={firstname}
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}/>
            </label>
            <label>
            Lastname
            <input
              type="text"
              value={lastname}
              placeholder="Lastname"
              onChange={(e) => setLastName(e.target.value)}/>
            </label>
        </>)}
          <label>
            Email
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <button>{authAction}</button>
        </form>
        <a onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>
        {loading && <p>Logging in...</p>}
        {error && <p>{error.data.message}</p>}
      </>
    )
}