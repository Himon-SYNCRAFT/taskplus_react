import React from 'react';
import axios from 'axios';

import {DataManagementList, DataManagementItem} from '../base/DataManagement.jsx';

export default class UserPanel extends React.Component {
    constructor() {
        super();
    }

    fetchData() {
        return axios.get('http://localhost:5000/users');
    }

    render() {

        let columns = [
            { headerColumnName: 'Imię', dataAttributeName: 'first_name', inputType: 'text' },
            { headerColumnName: 'Nazwisko', dataAttributeName: 'last_name', inputType: 'text' },
            { headerColumnName: 'Login', dataAttributeName: 'login', inputType: 'text' },
            { headerColumnName: 'Admin', dataAttributeName: 'is_admin', inputType: 'checkbox' },
            { headerColumnName: 'Zleceniobiorca', dataAttributeName: 'is_contractor', inputType: 'checkbox' },
            { headerColumnName: 'Zleceniodawca', dataAttributeName: 'is_creator', inputType: 'checkbox' },
        ];

        let htmlId = 'users-list';

        return (<DataManagementList htmlId={htmlId} columns={columns} fetchData={this.fetchData()} />);
    }
}
