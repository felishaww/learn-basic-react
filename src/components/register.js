import React from "react";
import { Formik } from 'formik';
import MaskedInput from 'react-text-mask';


import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {

        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        return (

            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('values', values)

                    if (values.email === "") {
                        //  alert('fill in the email!');
                        return;
                    }
                }}
                validate={(values => {
                    console.log('values2', values);
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = "Invalid email address";
                    }

                    if (!values.password) {
                        errors.password = 'Fill in login password'
                    }
                    if (values.password.length <= 6) {
                        errors.password = 'Password harus lebih dari 6 karakter ya'
                    }
                    if (values.password !== values.confirmPassword) {
                        errors.confirmPassword = "Tidak sama"
                    }
                    if (!values.nickname) {
                        errors.nickname = 'Fill in nickname'
                    }
                    if (!values.residence) {
                        errors.residence = 'Choose your residence'
                    }
                    if(!values.phoneNumber){
                        errors.phoneNumber = 'Required'
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

                        <Form className="regist-from" {...formItemLayout} onSubmit={handleSubmit}>
                            <Form.Item label="E-mail">
                                <Input
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="email"
                                    type="email"
                                    placeholder="email"
                                />

                                {errors.email && touched.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </Form.Item>
                            <Form.Item label="Password" hasFeedback>
                                <Input.Password
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="password"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password" />
                                {errors.password && touched.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </Form.Item>
                            <Form.Item label="Confirm Password" hasFeedback>
                                <Input.Password
                                    onBlur={this.handleConfirmBlur}
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="confirmPassword"
                                    type="confirmPassword" />

                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                )}
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span>
                                        Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </span>
                                }
                            >
                                <Input
                                    onBlur={this.handleConfirmBlur}
                                    value={values.nickname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="nickname"
                                    type="nickname" />

                                {errors.nickname && touched.nickname && (
                                    <div className="invalid-feedback">{errors.nickname}</div>
                                )}

                            </Form.Item>
                            <Form.Item label="Habitual Residence">
                                <Cascader options={residences}
                                    onBlur={this.handleConfirmBlur}
                                    value={values.residence}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    id="residence"
                                    type="residence" />

                                {errors.residence && touched.residence && (
                                    <div className="invalid-feedback">{errors.residence}</div>
                                )}
                            </Form.Item>
                            <Form.Item label="Phone Number">
                                <MaskedInput
                                    mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    guide={false}
                                    class="input"
                                    id='phoneNumber'
                                    placeHolder="Enter a phone number"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{ width: "100%" }}
                                />
                                {errors.phoneNumber && touched.phoneNumber && (
                                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                                )}
                            </Form.Item>
                            <Form.Item label="Website">

                                <AutoComplete
                                    dataSource={websiteOptions}
                                    onChange={this.handleWebsiteChange}
                                    placeholder="website"
                                >
                                    <Input />
                                </AutoComplete>

                            </Form.Item>
                            <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                                <Row gutter={8}>
                                    <Col span={12}>
                                        <Input />
                                    </Col>
                                    <Col span={12}>
                                        <Button>Get captcha</Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>

                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>

                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    Register
            </Button>
                            </Form.Item>
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}

export default (RegistrationForm);