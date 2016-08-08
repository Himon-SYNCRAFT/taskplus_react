import React from 'react';
import {objectValues, cloneObject} from '../../misc/helpers.js'


export class DataManagementList extends React.Component {

    constructor() {
        super();

        this.state = {
            items: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleChange(attribute, value, index) {
        let items = this.state.items;
        let data = {};
        data[attribute] = value;
        items[index] = Object.assign(cloneObject(items[index]), data);

        this.setState({items});
    }

    deleteItem(index) {
        if (index >= this.state.items.length) {
            console.log('Invalid index value');
            return;
        }

        let items = this.state.items.filter((item, i) =>  index !== i);

        this.setState({items});
    }

    addItem() {
        let items = this.state.items;
        let new_item = {};

        for(let i = 0; i < this.props.columns.length; i++) {
            let column = this.props.columns[i];

            switch (column.inputType) {
                case 'checkbox':
                    new_item[column.dataAttributeName] = false;
                    break;
                default:
                    new_item[column.dataAttributeName] = "";
            }
        }

        items.push(new_item);

        this.setState({items});
    }

    componentDidMount() {
        this.props.fetchData.then((response) => {
            this.setState({items: response.data});
        });
    }

    render() {
        let columns = this.props.columns;
        let headerCols = columns.map((item, i) => {
            return (<th key={i+1}>{item.headerColumnName}</th>);
        });

        let handleChange = this.handleChange;
        let deleteItem = this.deleteItem;

        headerCols.unshift(<th key={0}>#</th>);
        headerCols.push(<th key={headerCols.length}>Edytuj</th>);
        headerCols.push(<th key={headerCols.length}>Usuń</th>);

        let items = this.state.items.map(function(item, i) {
            return (<DataManagementItem
                        key={i} index={i} data={item}
                        columns={columns} handleChange={handleChange}
                        deleteItem={deleteItem.bind(this, i)}
                    />)
        });

        return (
            <table id={this.props.htmlId} className="table table-striped data-management-cmp">
                <thead>
                    <tr>{headerCols}</tr>
                </thead>
                <tbody>
                    {items}
                    <tr>
                        <td colSpan={headerCols.length}>
                            <button onClick={this.addItem} className="btn btn-warning">
                                <span className="glyphicon glyphicon-plus"></span> Dodaj
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export class DataManagementItem extends React.Component {
    constructor() {
        super();

        this.state = {
            editing: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this._prepareColumns = this._prepareColumns.bind(this);
        this._prepareHtmlInput = this._prepareHtmlInput.bind(this);
    }

    render() {
        let items = this._prepareColumns();

        return (
            <tr>
                {items}
            </tr>
        );
    }

    isEditing() {
        return this.state.editing;
    }

    handleChange(event) {
        let attribute = event.target.name;
        let value = event.target.value;
        let index = this.props.index;

        if (event.target.type === 'checkbox') {
            value = !this.props.data[attribute];
        }

        this.props.handleChange(attribute, value, index);
    }

    toggleEdit() {
        this.setState({ editing: !this.state.editing });
    }

    _prepareColumns() {
        let data = this.props.data;
        let items = [];

        items.push(<td key={items.length}>{this.props.index + 1}</td>);

        this.props.columns.forEach((column, i) => {
            if (!this.isEditing()) {
                let html = this._prepareHtml(
                    column.inputType,
                    data[column.dataAttributeName],
                    items.length
                );

                items.push(html);
            } else {
                let htmlInput = this._prepareHtmlInput(
                    column.inputType,
                    data[column.dataAttributeName],
                    column.dataAttributeName,
                    this.handleChange
                );

                items.push(
                    <td key={items.length}>
                        {htmlInput}
                    </td>
                );
            }
        });

        if (!this.isEditing()) {
            items.push(
                <td key={items.length}>
                    <button onClick={this.toggleEdit} className="btn btn-info">
                        <span className="glyphicon glyphicon-edit"></span> Edytuj
                    </button>
                </td>
            );
        } else {
            items.push(
                <td key={items.length}>
                    <button onClick={this.toggleEdit} className="btn btn-success">
                        <span className="glyphicon glyphicon-save"></span> Zapisz
                    </button>
                </td>
            );
        }

        items.push(
            <td key={items.length}>
                <button onClick={this.props.deleteItem} className="btn btn-danger">
                    <span className="glyphicon glyphicon-remove"></span> Usuń
                </button>
            </td>
        );

        return items;
    }

    _prepareHtmlInput(type, value, name, onChange, options = []) {
        switch (type) {
            case 'checkbox':
                return (<input type={type} name={name} checked={value} onChange={onChange}/>);
                break;
            case 'select':
                <select name="{name}" selected={value}>
                    {options}
                </select>
                break;
            default:
                return (<input type={type} name={name} value={value} onChange={onChange}/>);
        }
    }

    _prepareHtml(type, value, key) {

        switch (type) {
            case 'checkbox':
                return (<td key={key}>{value ? 'tak' : 'nie'}</td>);
                break;
            default:
                return (<td key={key}>{value}</td>);
        }
    }
}
