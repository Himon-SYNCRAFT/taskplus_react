import React from 'react';

export class UserList extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [
                {
                    "first_name": "Daniel",
                    "id": 2,
                    "is_admin": false,
                    "is_contractor": true,
                    "is_creator": true,
                    "last_name": "Zawłocki",
                    "login": "danzaw"
                },
                {
                    "first_name": "Przemek",
                    "id": 3,
                    "is_admin": true,
                    "is_contractor": true,
                    "is_creator": false,
                    "last_name": "Ociepa",
                    "login": "przoci"
                },
                {
                    "first_name": "Daniel",
                    "id": 1,
                    "is_admin": true,
                    "is_contractor": true,
                    "is_creator": true,
                    "last_name": "Zawłocki",
                    "login": "admin"
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    handleChange(value, index) {
        let users = this.state.users;
        users[index] = Object.assign(users[index], value);

        this.setState({users});
    }

    deleteUser(index) {
        let users = this.state.users.filter(function(item, i) {
            return index !== i;
        });

        this.setState({users});
    }

    addUser(index) {
        let users = this.state.users;
        users.push({
            "first_name": "",
            "id": new Date().getTime(),
            "is_admin": false,
            "is_contractor": false,
            "is_creator": false,
            "last_name": "",
            "login": ""
        });

        this.setState({users});
    }

    render() {
        let items = [];
        let style = {
            tableLayout: "fixed"
        }

        for(let i = 0; i < this.state.users.length; i++) {
            let user = this.state.users[i];
            items.push(<UserListItem
                            deleteUser={this.deleteUser.bind(this, i)}
                            handleChange={this.handleChange}
                            index={i}
                            key={user.id}
                            user={user}
                        />);
        }

        return (
            <table id="user-list" className="table table-striped" style={style}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Login</th>
                        <th>Zleceniobiorca</th>
                        <th>Zleceniodawca</th>
                        <th>Admin</th>
                        <th>Edytuj</th>
                        <th>Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                    <tr>
                        <td colSpan="9">
                            <button onClick={this.addUser} className="btn btn-warning">
                                <span className="glyphicon glyphicon-plus"></span> Dodaj
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export class UserListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false
        };

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleIsContractorChange = this.handleIsContractorChange.bind(this);
        this.handleIsCreatorChange = this.handleIsCreatorChange.bind(this);
        this.handleIsAdminChange = this.handleIsAdminChange.bind(this);
    }

    toggleEdit() {
        this.setState({ editing: !this.state.editing });
    }

    handleFirstNameChange(event) {
        let value = {first_name: event.target.value};
        this.props.handleChange(value, this.props.index);
    }

    handleLastNameChange(event) {
        let value = {last_name: event.target.value};
        this.props.handleChange(value, this.props.index);
    }

    handleLoginChange(event) {
        let value = {login: event.target.value};
        this.props.handleChange(value, this.props.index);
    }

    handleIsContractorChange(event) {
        let value = {is_contractor: !this.props.user.is_contractor};
        this.props.handleChange(value, this.props.index);
    }

    handleIsCreatorChange(event) {
        let value = {is_creator: !this.props.user.is_creator};
        this.props.handleChange(value, this.props.index);
    }

    handleIsAdminChange(event) {
        let value = {is_admin: !this.props.user.is_admin};
        this.props.handleChange(value, this.props.index);
    }

    render() {
        let row;

        let input_style = {
            width: "100%"
        };

        if(!this.state.editing) {
            row = (
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td>{this.props.user.first_name}</td>
                    <td>{this.props.user.last_name}</td>
                    <td>{this.props.user.login}</td>
                    <td>{this.props.user.is_contractor ? 'tak' : 'nie'}</td>
                    <td>{this.props.user.is_creator ? 'tak' : 'nie'}</td>
                    <td>{this.props.user.is_admin ? 'tak' : 'nie'}</td>
                    <td>
                        <button onClick={this.toggleEdit} className="btn btn-info">
                            <span  className="glyphicon glyphicon-edit"></span> Edytuj
                        </button>
                    </td>
                    <td>
                        <button onClick={this.props.deleteUser} className="btn btn-danger">
                            <span className="glyphicon glyphicon-remove"></span> Usuń
                        </button>
                    </td>
                </tr>
            );
        } else {
            row = (
                <tr>
                    <td>{this.props.index + 1}</td>
                    <td><input onChange={this.handleFirstNameChange} style={input_style} type="text" value={this.props.user.first_name} /> </td>
                    <td><input onChange={this.handleLastNameChange} style={input_style} type="text" value={this.props.user.last_name} /> </td>
                    <td><input onChange={this.handleLoginChange} style={input_style} type="text" value={this.props.user.login} /></td>
                    <td><input onChange={this.handleIsContractorChange} style={input_style} type="checkbox" checked= {this.props.user.is_contractor} /></td>
                    <td><input onChange={this.handleIsCreatorChange} style={input_style} type="checkbox" checked={this.props.user.is_creator}/></td>
                    <td><input onChange={this.handleIsAdminChange} style={input_style} type="checkbox" checked={this.props.user.is_admin} /></td>
                    <td>
                        <button onClick={this.toggleEdit} className="btn btn-success">
                            <span className="glyphicon glyphicon-save"></span> Zapisz
                        </button>
                    </td>
                    <td>
                        <button onClick={this.props.deleteUser} className="btn btn-danger">
                            <span className="glyphicon glyphicon-remove"></span> Usuń
                        </button>
                    </td>
                </tr>
            );
        }

        return row;
    }
}
