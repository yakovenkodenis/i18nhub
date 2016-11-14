import React, { Component } from 'react';
import { connect } from 'react-redux';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default connect()(Dashboard);
