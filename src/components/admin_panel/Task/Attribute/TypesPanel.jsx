import React from 'react';
import axios from 'axios';

import {DataManagementList, DataManagementItem} from '../../../base/DataManagement.jsx';

export default class AttributesTypesPanel extends React.Component {
    constructor() {
        super();
    }

    fetchData() {
        return axios.get('http://localhost:5000/task/attribute/types');
    }

    render() {

        let columns = [
            { headerColumnName: 'Nazwa', dataAttributeName: 'name', inputType: 'text' },
        ];

        let htmlId = 'tasks-attributes-types-list';

        return (<DataManagementList htmlId={htmlId} columns={columns} fetchData={this.fetchData()} />);
    }
}
