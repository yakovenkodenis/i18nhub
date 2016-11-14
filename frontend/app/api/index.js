import axios from 'axios';

import { Auth } from '../config/constants';


export default class I18NHubAPI {
    constructor() {
        this.baseURL = 'http://localhost:8000';
        this.baseAPIurl = `${this.baseURL}/api/v1`;
        this.jwt = localStorage.getItem(Auth.JWT_KEY) || '';
        this._initAxiosInstance(this.jwt);
    }

    set token(token) {
        this.jwt = token;
        this._initAxiosInstance(this.jwt);
        localStorage.setItem(Auth.JWT_KEY, this.jwt);
    }

    get auth() {
        return {
            signup: this.signup.bind(this),
            getJWT: this.getJWT.bind(this),
            refreshJWT: this.refreshJWT.bind(this),
            verifyJWT: this.verifyJWT.bind(this)
        }
    }

    get projects() {
        return {
            getAllProjects: this.getAllProjects.bind(this),
            getProject: this.getProject.bind(this),
            createProject: this.createProject.bind(this),
            updateProject: this.updateProject.bind(this),
            deleteProject: this.deleteProject.bind(this)
        }
    }

    get translations() {
        return {
            getAllTranslations: this.getAllTranslations.bind(this),
            getTranslation: this.getTranslation.bind(this),
            createTranslation: this.createTranslation.bind(this),
            updateTranslation: this.updateTranslation.bind(this),
            removeTranslationValue: this.removeTranslationValue.bind(this),
            deleteTranslation: this.deleteTranslation.bind(this)
        }
    }

    _initAxiosInstance(jwt) {
        this.axios = axios.create({
            baseURL: this.baseAPIurl,
            headers: {
                'Authorization': `JWT ${jwt}`
            }
        });
    }

    signup(username, first_name, last_name, email, password) {
        return axios.post(`${this.baseURL}/signup/`, {
            username, first_name, last_name, email, password
        });
    }

    getJWT(username, password) {
        return axios.post(`${this.baseURL}/api-token-auth/`, {
            username, password
        });
    }

    refreshJWT(token) {
        return axios.post(`${this.baseURL}/api-token-refresh/`, {
            token
        });
    }

    verifyJWT(token) {
        return axios.post(`${this.baseURL}/api-token-verify/`, {
            token
        });
    }

    getAllProjects() {
        return this.axios.get('/projects/all/');
    }

    getProject(id) {
        return this.axios.get(`/projects/${id}/`);
    }

    createProject(project_name, project_desc) {
        return this.axios.post('/projects/create/', {
            project_name, project_desc
        });
    }

    updateProject(project_id, name, description) {
        return this.axios.put('/projects/update/', {
            project_id, name, description
        });
    }

    deleteProject(project_id) {
        return this.axios.delete('/projects/delete/', {
            project_id
        });
    }

    getAllTranslations(project_id) {
        return this.axios.get(`/translations/${project_id}/`);
    }

    getTranslation(project_id, lang) {
        return this.axios.get(`/translations/${project_id}/${lang}/`);
    }

    createTranslation(project_id, lang, values) {
        return this.axios.post('/translations/create/', {
            data: {
                project_id, lang, values
            }
        });
    }

    updateTranslation(project_id, lang, key, value) {
        return this.axios.put('/translations/update/', {
            data: {
                project_id, lang, key, value
            }
        });
    }

    removeTranslationValue(project_id, lang, key) {
        return this.axios.put('/translations/remove_value/', {
            data: {
                project_id, lang, key
            }
        });
    }

    deleteTranslation(project_id, lang) {
        return this.axios.delete('/translations/delete/', {
            data: {
                project_id, lang
            }
        });
    }
}
