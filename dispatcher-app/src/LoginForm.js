import React from 'react';
import ReactDOM from 'react-dom';

import {
    Form, Icon, Input, Button, Checkbox, Card,
    Select
} from 'antd';

import './App.css';

const Option = Select.Option;
const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleSelectChange = (value) => {
        // console.log(value);
        this.props.form.setFieldsValue({
            note: value
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Card title="Login" style={{ width: 400, margin: 'auto', marginTop: 20 }}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                            )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <br />
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;
