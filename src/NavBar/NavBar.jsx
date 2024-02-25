import { logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom'
import logo from '../assets/images/RT_Logo.png';
import {
    Container,
    Button,
    Navbar,
    Nav,
    Form,
} from "react-bootstrap";


export default function NavBar({ Link }) {
    const [user] = useAuthState(auth);

    const sendEmHome = () => {
        return <Navigate to="/Home" />
    }


    return (
        <Navbar bg="dark" expand="lg" variant='dark' sticky="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/Home" className="logo" id="logo">
                    <img
                        src={logo}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand as={Link} to="/Home">
                    <h1 className="title" id="title">Rabid Tasker</h1>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{
                        maxHeight: '100px'
                    }} navbarScroll>
                        <Nav.Link as={Link} to="/features" >
                            Features
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact" >
                            Contact
                        </Nav.Link>
                        <Nav.Link as={Link} to="/settings" >
                            Settings
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        {!user ? (
                            <Button
                                variant="outline-primary"
                                onClick={signInWithGoogle}
                            >
                                Log in
                            </Button>
                        ) : (
                            <>
                                <Link to="/Home">
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => {
                                            sendEmHome()
                                            logout()
                                        }}
                                    >
                                        Log out
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}