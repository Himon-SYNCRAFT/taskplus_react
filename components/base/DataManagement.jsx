import React from 'react';
import {objectValues} from '../../lib/helpers.js'

export class DataManagementList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let headerCols = this.props.headerCols.map(function(item, i) {
            return (<th key={i}>{item}</th>);
        });

        return (
            <table id={this.props.htmlId} className="table table-striped">
                <thead>
                    <tr>{headerCols}</tr>
                </thead>
                <tbody></tbody>
            </table>
        );
    }
}

export class DataManagementItem extends React.Component {
    constructor() {
        super();
    }

    render() {
        let values = objectValues(this.props.data);
        let items = values.map((item, i) => <td key={i}>{item}</td>);

        return (
            <tr>
                {items}
            </tr>
        );
    }
}
