import React from 'react';
import axios from 'axios';

import {DataManagementList, DataManagementItem} from '../../base/DataManagement.jsx';

export default class AttributesPanel extends React.Component {
    constructor() {
        super();
    }

    fetchData() {
        return axios.get('http://localhost:5000/task/attributes');
    }

    render() {

        let columns = [
            { headerColumnName: 'Nazwa', dataAttributeName: 'name', inputType: 'text' },
            { headerColumnName: 'Id typu', dataAttributeName: 'type_id', inputType: 'number' },
        ];

        let htmlId = 'tasks-attributes-list';

        return (<DataManagementList htmlId={htmlId} columns={columns} fetchData={this.fetchData()} />);
    }
}
