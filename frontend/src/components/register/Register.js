import "./Register.css";

import { Alert, Button } from 'react-bootstrap';

import Form from "react-bootstrap/Form";
import React from 'react';
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { CreateUser, UserLogin } from "../../services/ApiServices"

export default function Register() {
  const [alert, setAlert] = useState({ showAlert: false })
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [seconds, setSeconds] = useState(5)
  const [username, setUsername] = useState("");

  React.useEffect(() => {
    console.log("isuccess", isSuccess)
    if (isSuccess && seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  });

  function ValidateForm() {
    return username.length > 0 && password.length > 0 && !isSuccess;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await CreateUser(username, password);
    if (data.is_success) {
      await UserLogin(username, password);
      setIsSuccess(true)
      setAlert({ showAlert: true, header: "USER CREATE SUCCESS", message: data.message})
    } else {
      const header = data.msg.error || "Unexpected error"
      const message = data.msg.message
      setAlert({ showAlert: true, header, message})
    }
    event.preventDefault();
  }

  function DisplayAlert() {
    let alert_attr = {}
    if(isSuccess){
      alert_attr["variant"] = "primary login-alert"
    } else {
      alert_attr["variant"] = "danger login-alert"
      alert_attr["dismissible"] = true
      alert_attr["onClose"] = () => setAlert({ ...alert, showAlert: false })
    }
      
    return (
      <Alert {...alert_attr} >
        <Alert.Heading>
          {alert.header}
        </Alert.Heading>
        {alert.message}
        {
          isSuccess ? (<p>You will be redirected to <a href="/">Home Page</a> after {seconds} seconds</p>) : null
        }
        
      </Alert>
    )
  }

  return (
    <div className="login">
      <div className="login-alert-container">
        {
          alert.showAlert ? DisplayAlert(alert) : null
        }
      </div>
      <div className="login-container">
        <Form onSubmit={handleSubmit} >
          <Form.Group size="lg" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              size="lg"
              autoFocus
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              size="lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="primary login-sign-in-btn" block size="lg" type="submit" disabled={!ValidateForm()}>
            Sign Up
          </Button>
          <br />
          {
            isSuccess && seconds == 0 ? <Redirect to="/" /> : null
          }
        </Form>
      </div>
    </div>
  );
}

