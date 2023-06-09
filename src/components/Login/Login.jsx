import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Login = () => {
  const { logIn, user } = useContext(AuthContext);
  const [errorMassage, setErrorMassage]= useState("")
  const location = useLocation()
  const navigate = useNavigate('')
  const from = location?.state?.pathname || '/'
  const handleLogin = (e) => {
    e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        logIn(email,password)
        .then(result =>{
            const loggedUser = result.user
            console.log(loggedUser);
            form.reset()
            navigate(from)
        })
        .catch(err=>{
            const errMassage = err.message
            setErrorMassage(errMassage)
        })
  };
  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content-center align-content-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-warning w-100 text-center">Please is login</h1>
        <div className="mt-5">
          <div className="">
            <Form
              onSubmit={handleLogin}
              className="mx-auto "
              style={{ width: "50%" }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {
                errorMassage && <p>{errorMassage}</p>
              }
              <p>
                Don't Have an Account?{" "}
                <Link to="/register">Please Register</Link>
              </p>
              <Button className="btn btn-warning" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
