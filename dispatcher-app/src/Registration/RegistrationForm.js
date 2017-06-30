import React from 'react';
import ReactDOM from 'react-dom';

import RegisterClasses from './RegisterClasses.js';

import '../App.css';

import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
    Card, Steps, message 
} from 'antd';

const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
    }];


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const shortFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 4 },
        sm: { span: 3 },
    },
};

const midFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        current: 0,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    /**
     * Main rendering thingy.
     */
    render() {

        const steps = [{
            title: 'Your Info',
            content: this.firstPage(),
        }, {
            title: 'Employee Info',
            content: this.secondPage(),
        }, {
                title: 'Daily Schedule',
                content: this.thirdPage(),
        }];

        const { current } = this.state;

        return (
            <Card style={{ width: 640, margin: 'auto', marginTop: 40 }}>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                <div className="steps-content" style={{ height: 700, marginTop: 40 }}>{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {/*Renders Previous*/}
                    {
                        this.state.current > 0
                        ?
                        <Button onClick={() => this.prev()}>
                            Previous
                        </Button>
                            :
                        <Button disabled>
                                Previous
                        </Button>
                    }

                    {/*Renders Next*/}
                    {
                        this.state.current < steps.length - 1
                        ?
                        <Button type="primary" style={{ marginLeft: 10 }} onClick={() => this.next()}>Next</Button>
                        :
                        <Button disabled style={{ marginLeft: 10 }} > Next </Button>
                    }
                    {/*htmlType="submit" size="large"*/}
                </div>
            </Card>
        );
    }

    /**
     * The personal data entry form.
     */
    firstPage = () => {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        return (

            <Form onSubmit={this.handleSubmit} style={{marginTop:20}}>
                {/*------------------------------------------ User Details ------------------------------------------*/}
                <h5 className="ui horizontal divider header">
                    <i className="tiny user icon"></i>User Details
                </h5>

                <FormItem {...formItemLayout} label="First Name" hasFeedback>
                    {getFieldDecorator('fname', {
                        rules: [{
                            required: true, message: 'Please input your first name!',
                        }],
                    })(<Input />)}
                </FormItem>
                {/*TODO: Limit one character*/}
                <FormItem {...shortFormItemLayout} label="Middle Initial" hasFeedback>
                    {getFieldDecorator('mname', {
                        rules: [],
                    })(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label="Last Name" hasFeedback>
                    {getFieldDecorator('lname', {
                        rules: [{
                            required: true, message: 'Please input your last name!',
                        }],
                    })(<Input />)}
                </FormItem>

                {/*------------------------------------------ ADDRESS ------------------------------------------*/}
                <h5 className="ui horizontal divider header">
                    <i className="tiny home icon"></i>Address
                </h5>
                <FormItem {...formItemLayout} label="Street" hasFeedback>
                    {getFieldDecorator('street', {
                        rules: [{
                            required: true, message: 'Please input street!',
                        }],
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="City" hasFeedback>
                    {getFieldDecorator('city', {
                        rules: [{
                            required: true, message: 'City',
                        }],
                    })(<Input />)}
                </FormItem>

                <FormItem
                    {...midFormItemLayout}
                    label="ZipCode">

                    {getFieldDecorator('zipcode', {
                        rules: [{ required: true, message: 'Please input your Zip Code!' }],
                    })(
                        <Input type="number" style={{ width: '100%' }} />
                        )}
                </FormItem>
                {/*------------------------------------------ CONTACT ------------------------------------------*/}
                <h5 className="ui horizontal divider header">
                    <i className="tiny phone icon"></i>Contact
                </h5>
                <FormItem
                    {...formItemLayout}
                    label="Phone Number">

                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input style={{ width: '100%' }} />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>
            </Form>
        );
    }

    /**
     * The employee data entry page.
     */
    secondPage = () => {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>

                {/*------------------------------------------ EMPLOYER ------------------------------------------*/}
                <h5 className="ui horizontal divider header">
                    <i className="tiny users  icon"></i>Employer
                </h5>

                <FormItem {...formItemLayout} label="Street" hasFeedback>
                    {getFieldDecorator('street', {
                        rules: [{
                            required: true, message: 'Please input street!',
                        }],
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="City" hasFeedback>
                    {getFieldDecorator('city', {
                        rules: [{
                            required: true, message: 'City',
                        }],
                    })(<Input />)}
                </FormItem>

                <FormItem
                    {...midFormItemLayout}
                    label="ZipCode">

                    {getFieldDecorator('zipcode', {
                        rules: [{ required: true, message: 'Please input your Zip Code!' }],
                    })(
                        <Input type="number" style={{ width: '100%' }} />
                        )}
                </FormItem>

                {/*------------------------------------------ EMPLOYER Contact ------------------------------------------*/}
                <h5 className="ui horizontal divider header">
                    <i className="tiny building icon"></i>Employer Contact
                </h5>
                <FormItem
                    {...formItemLayout}
                    label="Phone Number">

                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(
                        <Input style={{ width: '100%' }} />
                        )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                    hasFeedback >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input />
                        )}
                </FormItem>
            </Form>
        );
    }

    /**
     * The class registry page.
     */
    thirdPage = () => 
    {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        /*------------------------------------------ Register for some Classes! ------------------------------------------*/
        return (
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
                <h5 className="ui horizontal divider header">
                    <i className="book icon"></i>
                    Course Registration
                </h5>
                <FormItem
                    label="System"
                    {...formItemLayout}>
                    {getFieldDecorator('system', {
                        rules: [{ required: true, message: 'Please select your registration system!' }],
                    })(
                        <Select
                            placeholder="Select a system to register for."
                            onChange={this.handleSelectChange}>

                            <Option value="tcp">TCP</Option>
                            <Option value="esc">ESCP</Option>
                        </Select>
                        )}
                </FormItem>

                {/* TODO: Move these to external table. */}
                <FormItem>
                    <Select placeholder="Start Date" style={{ width: 120 }}>
                        <Option value="all">All Dates</Option>
                        <Option value="future">Future Dates</Option>
                    </Select>
                    <Select
                        mode="tags" 
                        style={{ marginLeft: 20, width: 240 }}
                        placeholder="All Categories">
                        <Option value="soils">Soils</Option>
                        <Option value="performance">Performance Exams</Option>
                        <Option value="aggnasphalts">Agg & Asphalts</Option>
                        <Option value="renewalagg">Renewal Agg & Asphalts</Option>
                    </Select>
                </FormItem>

                {/* TODO: Add classes here. */}
                <FormItem>
                    <RegisterClasses />
                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green', float: 'right' }}>Register</Button>
                </ FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;