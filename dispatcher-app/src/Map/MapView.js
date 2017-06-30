import React from 'react';
import ReactDOM from 'react-dom';

import { Transfer, Button, Card } from 'antd';

import '../App.css';

class MapView extends React.Component {
    render() {
        return (
            <Card title="Route Planner" className="bigCard">
                <div id="map" className="mapStyle"></div>
            </Card>);
    }

    componentDidMount()
    {
        window.loadMap();
    }
}

export default MapView;