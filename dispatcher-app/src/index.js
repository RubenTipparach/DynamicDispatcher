import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import LoginForm from './LoginForm.js';
import RegistrationForm from './Registration/RegistrationForm.js';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import registerServiceWorker from './registerServiceWorker';

import enUS from 'antd/lib/locale-provider/en_US';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

const TCPView = () => (
    <div>
        <Layout className="layout" >
            <Header>Technical Certification Program</Header>
            <Layout>
                <Sider>left sidebar</Sider>
                <Content>main content</Content>
                <Sider>right sidebar</Sider>
            </Layout>
            <Footer>footer</Footer>
        </Layout>
    </div>
);

const ESCView = () => (
    <Layout>
        <Header>Erosion and Sediment Control Certification Program</Header>
        <Layout>
            <Sider>left sidebar</Sider>
            <Content>main content</Content>
            <Sider>right sidebar</Sider>
        </Layout>
        <Footer>footer</Footer>
    </Layout>
)

let routerStuff =
    <div>
    <Router >{/*basename="/certification"*/}
            <div>

            <Menu
                mode="horizontal"
                theme="dark">
                <Menu.Item key="login">
                    <Link to="/login">Admin</Link>
                    </Menu.Item>
                <Menu.Item key="register">
                    <Link to="/register">Register</Link>
                </Menu.Item>
                <Menu.Item key="tcp">
                    <Link to="/tcp">TCP</Link>
                    </Menu.Item>
                <Menu.Item key="ESC">
                    <Link to="/esc">ESC</Link>
                </Menu.Item>
            </Menu>

            <hr />

            <Route path="/Login" component={LoginForm} />
            <Route path="/register/" component={RegistrationForm} />
            <Route path="/tcp/" component={TCPView} />
            <Route path="/esc/" component={ESCView} />
            <Route path="/main/" component={main} />
        </div>
    </Router></div>;

const main = () => {
    <Layout className="layout" >
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1">TCP</Menu.Item>
                <Menu.Item key="2">ESC</Menu.Item>
            </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>

        <div style={{ background: '#fff', margin: 20, padding: 24, minHeight: 280 }}>
            Content
        </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>

        </Footer>
    </Layout>
}

ReactDOM.render(
    routerStuff
    , document.getElementById('root'));

registerServiceWorker();
