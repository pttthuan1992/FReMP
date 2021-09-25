import "./Login.css";

import { Alert, Button } from 'react-bootstrap';

import Form from "react-bootstrap/Form";
import { Redirect, } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserLogin, GetBrowserCookie, GetTokenByUsername } from "../../services/ApiServices";

export default function Login() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState({showAlert: false, error: "", message: ""})
  const [token, setToken] = useState("");

  useEffect(() => {
    async function verifyToken(){
      let { username: logedInUsername, token: logedInToken } = GetBrowserCookie()
      if(logedInUsername){
        const {is_success, msg} = await GetTokenByUsername(logedInUsername)
        if(is_success && msg.token == logedInToken){
          setToken(msg.token)
          console.log("Authentication success")
        }
      }
    }
    verifyToken()
  }, []);

  function validateForm() {
    return username.length > 0 && password.length > 0;
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
        <Alert { ...alert_attr } >  
          <Alert.Heading>
            {alert.error || "Unexpected Error"}
          </Alert.Heading>
          <p>
            {alert.message}
          </p>
        </Alert>
    )
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = await UserLogin(username, password)
    if(data.is_success){
      console.log("login success")
      setIsSuccess(true)
    } else {
      console.log(data.msg)
      setAlert({showAlert: true, ...data.msg})
    }
      
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
          <br/>
          <Button variant="primary login-sign-in-btn" block size="lg" type="submit" disabled={!validateForm()}>
            Sign In
          </Button>
          <br/>
          {
            isSuccess || token ? <Redirect to="/" />  : null
          }
        </Form>
      </div>
    </div>
  );
}

