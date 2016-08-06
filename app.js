import React from 'react';
import ReactDOM from 'react-dom';
import {UserList, UserListItem} from "./components/admin_panel/user.jsx";
import {DataManagementList, DataManagementItem} from "./components/base/DataManagement.jsx";

let columns = [
    { headerColumnName: 'Imię', dataAttributeName: 'first_name', inputType: 'text' },
    { headerColumnName: 'Nazwisko', dataAttributeName: 'last_name', inputType: 'text' },
    { headerColumnName: 'Login', dataAttributeName: 'login', inputType: 'text' },
    { headerColumnName: 'Admin', dataAttributeName: 'is_admin', inputType: 'checkbox' },
    { headerColumnName: 'Zleceniobiorca', dataAttributeName: 'is_contractor', inputType: 'checkbox' },
    { headerColumnName: 'Zleceniodawca', dataAttributeName: 'is_creator', inputType: 'checkbox' },
];
let htmlId = 'my-list';

ReactDOM.render(
    <DataManagementList htmlId={htmlId} columns={columns}/>,
    document.getElementById('main')
);
