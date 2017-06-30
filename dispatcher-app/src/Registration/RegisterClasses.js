import React from 'react';
import ReactDOM from 'react-dom';

import { Transfer, Button } from 'antd';

import '../App.css';

const classData = {

}

class RegisterClasses extends React.Component {

    state = {
        mockData: [],
        targetKeys: [],
    }

    componentDidMount() {
        this.getMock();
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [
            {
                key: 1,
                title: `Learn Js`,
                description: `1/23/2018 9:00 AM`,
                chosen: false
            },
            {
                key: 2,
                title: `React Native`,
                description: `4/22/2018 9:00 PM`,
                chosen: false
            },];

        this.setState({ mockData, targetKeys });
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    renderFooter = () => {
        return (
            <Button
                size="small"
                style={{ float: 'right', margin: 5 }}
                onClick={this.getMock}
            >
                reload
      </Button>
        );
    }

    render() {
        return (
            <Transfer
                dataSource={this.state.mockData}
                showSearch
                listStyle={{
                    width: 250,
                    height: 300,
                }}

                operations={['add', 'remove']}

                targetKeys={this.state.targetKeys}

                onChange={this.handleChange}
                render={item => `${item.title}-${item.description}`}
                footer={this.renderFooter}
            />
        );
    }
}

export default RegisterClasses;