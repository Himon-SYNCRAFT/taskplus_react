import React from 'react';
import axios from 'axios';

import {DataManagementList, DataManagementItem} from '../../base/DataManagement.jsx';

export default class TypesPanel extends React.Component {
    constructor() {
        super();
    }

    fetchData() {
        return axios.get('http://localhost:5000/task/types');
    }

    render() {

        let columns = [
            { headerColumnName: 'Nazwa', dataAttributeName: 'name', inputType: 'text' },
        ];

        let htmlId = 'tasks-types-list';

        return (<DataManagementList htmlId={htmlId} columns={columns} fetchData={this.fetchData()} />);
    }
}
