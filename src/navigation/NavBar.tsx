import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';


export default class NavBar extends React.Component<{}> {

  public render() {
    return (
      <div>
        <Navbar color="light" light={true} expand="md">
          <Link to="/">
            <NavbarBrand>TypeScript React Exercise</NavbarBrand>
          </Link>
        </Navbar>
      </div>
    );
  }
}
