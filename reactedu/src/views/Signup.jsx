import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
function SignUp() {
  const nameRef = useRef();
  const lastRef = useRef();
  const roleRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      first_name: nameRef.current.value,
      last_name: lastRef.current.value,
      role: roleRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    // const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // , {
    //   headers: {
    //     'X-CSRF-TOKEN': csrfToken  // Include the CSRF token in the headers
    //   }
    // }
    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        console.log(payload);
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        alert(err);
        console.log(response);
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="title">Signup for Free</h1>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <input ref={nameRef} type="text" placeholder="First Name" />
      <input ref={lastRef} type="text" placeholder="Last Name" />
      <input ref={roleRef} type="text" placeholder="Role" />
      <input ref={emailRef} type="email" placeholder="Email Address" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <input
        ref={passwordConfirmationRef}
        type="password"
        placeholder="Repeat Password"
      />
      <button className="btn btn-block">Signup</button>
      <p className="message">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
}

export default SignUp;
