import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import LoginForm from './LoginForm.js';
import RegistrationForm from './Registration/RegistrationForm.js';

import MapView from './Map/MapView.js';
import ListView from './ListView/ListView.js';

import { Layout, Menu, Icon, Breadcrumb, Card } from 'antd';
import registerServiceWorker from './registerServiceWorker';

import enUS from 'antd/lib/locale-provider/en_US';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';

const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;


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
                <Menu.Item key="list">
                    <Link to="/list">Employees</Link>
                    </Menu.Item>
                <Menu.Item key="map">
                    <Link to="/map">Map</Link>
                </Menu.Item>
            </Menu>

            <hr />

            <Route path="/Login" component={LoginForm} />
            <Route path="/register/" component={RegistrationForm} />
            <Route path="/list/" component={ListView} />
            <Route path="/map/" component={MapView} />
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
