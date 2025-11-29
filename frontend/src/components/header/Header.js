import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import axios from "axios";

const Header = ({ setSearch }) => {
  const navigate = useNavigate(); //from react-router v6 usehistory is removed and useNavigate is used
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

    const logoutHandler = () => {
      try {
        // remove axios default header so components won't make auth calls after logout
        delete axios.defaults.headers.common["Authorization"];

        // dispatch redux logout to clear store + localStorage
        dispatch(logout());

        // navigate to home (do this after dispatch)
        navigate("/");
      } catch (err) {
        console.error("Logout failed", err);
        navigate("/");
      }
    };
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Note Zipper</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)} //it will update the search state in App.js
              />
            </Form>
          </Nav>
          {userInfo ? (<Nav>
            <Nav.Link as={Link} to="/mynotes">
              My Notes
            </Nav.Link>
            <NavDropdown
              title={userInfo?.name }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>) : (
            <Nav> <Nav.Link as={Link} to="/login">Login</Nav.Link></Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
