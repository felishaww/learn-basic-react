import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Formik } from 'formik';
import './login.css'

class NormalLoginForm extends React.Component {
    handleSubmit = e => {

    };

    render() {

        return (
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values)

                    if (values.username === "") {
                        //  alert('fill in the username!');
                        return;
                    }
                }}
                validate={(values => {
                    console.log('values2', values);
                    const errors = {};
                    if (!values.username) {
                        errors.username = 'Fill in login username'
                    }

                    if (!values.password) {
                        errors.password = 'Fill in login password'
                    }
                    if(values.password.length <= 6 ){
                        errors.password = 'Password harus lebih dari 6 karakter ya'
                    }
                    return errors;
                })}

            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                    } = props;
                    return (
                        <Form onSubmit={handleSubmit} className="login-form">
                            <Form.Item>

                                <Input
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="username"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                                {errors.username && touched.username && (
                                    <div className="invalid-feedback">{errors.username}</div>
                                )}

                            </Form.Item>
                            <Form.Item>

                                <Input
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                                {errors.password && touched.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}

                            </Form.Item>
                            <Form.Item>
                                <Checkbox>Remember me</Checkbox>
                                <a className="login-form-forgot" href="">
                                    Forgot password
                  </a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                  </Button>
                                Or <a href="">register now!</a>
                            </Form.Item>
                        </Form>
                    );
                }}
            </Formik>


        );
    }
}

export default (NormalLoginForm);