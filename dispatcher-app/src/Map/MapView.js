import React from 'react';
import ReactDOM from 'react-dom';

import { Transfer, Button, Card } from 'antd';

import '../App.css';

class MapView extends React.Component {
    render() {
        return (
			<div>
				<div id="map" className="mapStyle"></div>

				<Card title="Route Planner" className="smallCard" >
					<br />
					...
					<br />
				</Card>
			</div>);
    }

    componentDidMount()
    {
        window.loadMap();
    }
}

export default MapView;