import React, { useContext, useEffect, useState } from 'react';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import './LoginForm.css'
import axios from '../../axios';
import AuthContext from '../../context/AuthContext';



function LoginForm() {
    const {getAdminLoggedIn} =useContext(AuthContext)
    const initialValue = {username:"",password:""}
    const [formValue, setFormValue] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        // if (Object.keys(formErrors).length === 0 && isSubmit) {
        //     console.log(formValue);
        //     const dataRes = axios.post('admin/login',formValue)
        //     console.log(dataRes)
        // }
    },[formErrors,errorMessage])

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormValue({...formValue,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setFormErrors(validateForm(formValue))
        setIsSubmit(true)
        try{
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                console.log(formValue);
                const dataRes = await axios.post('admin/login',formValue)
                console.log(dataRes)
            }
        }catch(e){
            console.log(e)
            setErrorMessage(e.response.data.errMsg)
        }

        getAdminLoggedIn()
        
    }

    const validateForm = (values)=>{
        const error = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username)
            error.username = 'Username is required'
        else if(!regex.test(values.username))
            error.username = 'Not a valid email'

        if(!values.password)
            error.password = 'Password is required'
        
        return error;
    }


    return (
        <Container>
            <Row className='justify-content-center mt-5 '>
                <Col xs={11} sm={8} md={4}>
                    <Form className='border border-3 p-3 border-radius-2 shadow p-3 mb-5 bg-body rounded' onSubmit={handleSubmit}>
                        <div className='col-12' >
                        <Form.Group className='text-center mb-3'>
                            <p style={{ fontSize: '1.2rem' }}>Login</p>
                            <p className='errorMsg'>{errorMessage}</p>
                        </Form.Group>
                        </div>
                        <div className='col-12'>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name='username' 
                            value={formValue.username}
                            onChange={handleChange}
                            />
                            <p className='errorMsg'>{formErrors.username}</p>

                        </Form.Group>
                        </div>
                        <div className='col-12'>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            name='password' 
                            value={formValue.password}
                            onChange={handleChange}
                             />
                            <p className='errorMsg'>{formErrors.password}</p>
                        </Form.Group>
                        </div>
                    
                        <div className='col-12' >
                        <button className='Button' type='submit'>
                            Login
                        </button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

}

export default LoginForm;
