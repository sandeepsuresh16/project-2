import React from 'react';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"



function LoginForm() {

    return (
        <Container>
            <Row className='justify-content-center mt-5'>
                <Col xs={11} sm={8} md={5}>
                    <Form className='border border-3 p-3 border-radius-2 shadow p-3 mb-5 bg-body rounded' >
                        <Form.Group className='text-center mb-3'>
                            <p style={{ fontSize: '1.2rem' }}>Login</p>
                            <p style={{ color: 'red' }}>errorMessage</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' />
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Col><input type="radio" lable="admin" name="staff" /></Col>
                                <Col><input type="radio" lable="teacher" name="staff" /></Col>
                            </Row>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginForm;
