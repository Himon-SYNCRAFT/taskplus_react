import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from "./components/admin_panel/Layout.jsx";
import UserPanel from "./components/admin_panel/UserPanel.jsx";
import StatusPanel from "./components/admin_panel/Task/StatusPanel.jsx";
import AttributesPanel from "./components/admin_panel/Task/AttributesPanel.jsx";
import TypesPanel from "./components/admin_panel/Task/TypesPanel.jsx";
import AttributesTypesPanel from "./components/admin_panel/Task/Attribute/TypesPanel.jsx";


ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <Route path="users" name="users" component={UserPanel}></Route>
            <Route path="task/statuses" name="statuses" component={StatusPanel}></Route>
            <Route path="task/attributes" name="attributes" component={AttributesPanel}></Route>
            <Route path="task/attribute/types" name="attribute-types" component={AttributesTypesPanel}></Route>
            <Route path="task/types" name="types" component={TypesPanel}></Route>
        </Route>
    </Router>,
    document.getElementById('app')
);
