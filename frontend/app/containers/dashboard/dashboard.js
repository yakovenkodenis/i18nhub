import React, { Component } from 'react';
import { connect } from 'react-redux';

import ApiTest from '../../components/api-test';
import Project from '../../components/project';


class Dashboard extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            projects: []
        }
    }

    componentWillMount() {
        this.I18NHubAPI = new I18NHubAPI();

        this.I18NHubAPI.projects.getAllProjects()
            .then(response => {
               this.setState({
                    projects: response.data
               });
            });
    }

    renderProjects() {
        this.state.projects.map(project => (
            <li>
                <Project {...project} />
            </li>
        ));
    }

    render() {
        return (
            <div>
                <h1>My Projects</h1>
                <ul>
                    {this.renderProjects()}
                </ul>
            </div>
        );
    }
}

export default connect()(Dashboard);
