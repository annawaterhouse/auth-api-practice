import { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "./form.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IoCheckmark } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
export default function AuthForm() {
  const navigate = useNavigate();

  // Swapping between login and register
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? "Sign In" : "Sign Up";
  const altCopy = isLogin
    ? "Don't have an account? Sign up here."
    : "Already have an account? Sign in here.";

  // Controlled form fields
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputValueVisible, setIsInputValueVisible] = useState(false);

  // Form submission
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /** Send the requested authentication action to the API */
  const attemptAuth = async (e) => {
    e.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = isLogin
      ? { email, password }
      : { firstname, lastname, email, password };

    setError(null);
    setLoading(true);

    try {
      // We need to unwrap here if we want to catch the error
      const response = await authMethod(credentials).unwrap();
      console.log("token", response.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = () => {
    setIsInputValueVisible(!isInputValueVisible);
  };

  return (
    <section className="container auth-container">
      <h1 className="auth-title">{authAction}</h1>
      <form className="auth-form" onSubmit={attemptAuth}>
        {!isLogin && (
          <>
            <label>
              Firstname
              <input
                type="text"
                value={firstname}
                placeholder="Firstname"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label>
              Lastname
              <input
                type="text"
                value={lastname}
                placeholder="Lastname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </>
        )}
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
          <section className="input-password-group">
          <input
            type={isInputValueVisible ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="input-password"
          />
          <section onClick={handleToggleVisibility} className="password-show-hide">
          <i className="eye">
            {isInputValueVisible ? (
              <FontAwesomeIcon className="i-eye i" icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon className="i-eye i" icon={faEye} />
            )}
          </i>
          </section>
          </section>
        </label>
        <button type="submit"><FaCheck className="check i" /></button>
      </form>
      <a className="switch" onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>
      {loading && <p>Logging in...</p>}
      {error && <p>{error.data.message}</p>}
    </section>
  );
}
