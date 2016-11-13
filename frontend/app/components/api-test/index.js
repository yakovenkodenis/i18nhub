import React, { Component } from 'react';

import I18NHubAPI from '../../api';


export default class ApiTest extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            projects: [],
            project: {},
            translations: [],
            translation: []
        }
    }

    componentWillMount() {
        this.I18NHubAPI = new I18NHubAPI();
        this.I18NHubAPI.auth.getJWT('denis', 'password12345')
            .then(response => {
                this.I18NHubAPI.token = response.data.token
            });
    }

    getAllProjects() {
        this.I18NHubAPI.projects.getAllProjects()
            .then(response => {
               this.setState({
                    ...this.state,
                    ...{projects: response.data}
               });
            });
    }

    getProject() {
        this.I18NHubAPI.projects.getProject(1)
            .then(response => {
               this.setState({
                    ...this.state,
                    ...{project: response.data}
               });
            });
    }

    getAllTranslations() {
        this.I18NHubAPI.translations.getAllTranslations(1)
            .then(response => {
               this.setState({
                    ...this.state,
                    ...{translations: response.data}
               });
            });
    }

    getTranslation() {
        this.I18NHubAPI.translations.getTranslation(1, 'en')
            .then(response => {
               this.setState({
                    ...this.state,
                    ...{translation: response.data}
               });
            });
    }

    render() {
        return (
            <div>
                <div>
                    <button onClick={this.getAllProjects.bind(this)}>
                        Get All Projects
                    </button>
                    <button onClick={this.getProject.bind(this)}>
                        Get Project 1
                    </button>
                    <button onClick={this.getAllTranslations.bind(this)}>
                        Get All Translations for Project 1
                    </button>
                    <button onClick={this.getTranslation.bind(this)}>
                        Get en Translation for Project 1
                    </button>
                </div>
                <div>
                    <h2>Projects:</h2>
                    {JSON.stringify(this.state.projects)}
                </div>
                <div>
                    <h2>Project:</h2>
                    {JSON.stringify(this.state.project)}
                </div>
                <div>
                    <h2>Translations:</h2>
                    {JSON.stringify(this.state.translations)}
                </div>
                <div>
                    <h2>Translation:</h2>
                    {JSON.stringify(this.state.translation)}
                </div>
            </div>
        );
    }
}
