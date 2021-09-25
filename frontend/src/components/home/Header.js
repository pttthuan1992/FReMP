import { useState, useEffect, forwardRef } from "react";
import { Button, Container, Row, Col, Dropdown } from 'react-bootstrap';
import { GetBrowserCookie, GetTokenByUsername, ClearBowserCookie } from "../../services/ApiServices"

export default function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function verifyToken() {
      let { username: logedInUsername, token: logedInToken } = GetBrowserCookie()
      if (logedInUsername) {
        const { is_success, msg } = await GetTokenByUsername(logedInUsername)
        // Verify if browser token exists on redis server
        if (is_success && msg.token == logedInToken) {
          setUsername(logedInUsername)
          console.log("Authentication success", logedInUsername)
        }
      }
    }
    verifyToken()
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
  }
  function RenderSignInButton() {
    return (
      <div>
        <Button variant="btn header-btn" block size="lg" href="/signin"> Sign In</Button>
        <Button variant="btn header-btn" block size="lg" href="/register"> Sign Up</Button>
      </div>
    )
  }
  const RenderUserAvatar = forwardRef(({ children, onClick }, ref) => (
    <a ref={ref} onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}>
      <i className="fas fa-user-circle fa-3x user-avatar" ></i>
    </a>
  ))

  function RenderUser() {
    return (
      <Dropdown className="text-right">
        <Dropdown.Toggle as={RenderUserAvatar} id="user-dropdown">
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>{username}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={SignOut}>Sign Out</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  function SignOut() {
    ClearBowserCookie();
    setUsername(null);
  }
  return (
    <header className="header">
      <Row>
        <Col xs={3}>
          <img className="logo" src={process.env.PUBLIC_URL + 'blade_logo.png'} alt="Logo"></img>
          <span className="brand-name" >Video Express</span>
        </Col>
      <Col></Col>
      <Col xs={2} block>
        {
          username ? RenderUser() : RenderSignInButton()
        }

      </Col>
      </Row>
    </header >
  );
}

