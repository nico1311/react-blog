import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Button,
  Navbar
} from 'react-bulma-components';

function NavigationBar () {
  const [active, setActive] = useState(false);

  return (
    <Navbar color="info" active={active}>
      <Navbar.Brand>
        <Link href="/">
          <Navbar.Item>
            <span style={{fontWeight: 'bold'}}>React Blog</span>
          </Navbar.Item>
        </Link>
        <Navbar.Burger onClick={() => setActive(!active)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="/" renderAs={Link}>
            Post listing
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container align="right">
          <Navbar.Item renderAs="div">
            <Button color="primary" href="/new" renderAs={Link}>
              New Post
            </Button>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  )

}

export default NavigationBar;
