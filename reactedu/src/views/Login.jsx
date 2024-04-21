import { Link } from "react-router-dom";
import { createRef } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import { useState } from "react";
import axiosClient from "../axios-client.js";
//import { c } from "vite/dist/node/types.d-aGj9QkWt.js";
function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    async function login(payload) {
      await axiosClient
        .post("/login", payload)
        .then(({ data }) => {
          setUser(data.data);
          console.log(data);
          setToken(data.token);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setMessage(response.data.message);
          }
        });

    }

    login(payload);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Login into EduConnect</h1>

      {message && (
        <div className="alert">
          <p>{message}</p>
        </div>
      )}

      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button className="btn btn-block">Login</button>
      <p className="message">
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </form>
  );
}

export default Login;
