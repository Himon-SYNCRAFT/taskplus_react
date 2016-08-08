import React from 'react';
import ReactTestUtils from '../../../node_modules/react-addons-test-utils/index.js';
import {DataManagementList, DataManagementItem} from './DataManagement.jsx';
import {objectValues} from '../../misc/helpers.js'

describe('DataManagementList', function() {
    let htmlId, columns, list, mockItems, mockFetch;

    beforeEach(function() {
        htmlId = 'my-list';

        columns = [
            { headerColumnName: 'id', dataAttributeName: 'id', inputType: 'number'},
            { headerColumnName: 'name', dataAttributeName: 'name', inputType: 'text'},
            { headerColumnName: 'admin', dataAttributeName: 'admin', inputType: 'checkbox'},
        ];

        mockItems = [
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
        ];

        mockFetch = {
            then: () => {}
        };

        list = ReactTestUtils.renderIntoDocument(
            <DataManagementList htmlId={htmlId} columns={columns} fetchData={mockFetch}/>
        );

        list.setState({
            items: mockItems
        });
    });

    it("should render table with given id and header columns", function() {
        expect(list.state.items.length).toBe(mockItems.length);

        let table = ReactTestUtils.findRenderedDOMComponentWithTag(
            list, 'table'
        );

        expect(table.id).toBe(htmlId);

        let ths = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            list, 'th'
        );

        expect(ths[0].textContent).toBe("#");
        expect(ths[columns.length + 1].textContent).toBe("Edytuj");
        expect(ths[columns.length + 2].textContent).toBe("Usuń");

        expect(ths.length).toBe(columns.length + 3);
    });

    it('should be able to alter the items', function() {
        list.handleChange('first_name', 'Konrad', 0);

        expect(list.state.items[0].first_name).toBe('Konrad');

        list.handleChange('is_admin', true, 0);
        expect(list.state.items[0].is_admin).toBe(true);

        list.handleChange('is_admin', false, 0);
        expect(list.state.items[0].is_admin).toBe(false);
    });

    it('should be able to delete the item', function() {
        expect(list.state.items.length).toBe(mockItems.length);

        let item = list.state.items[1];
        list.deleteItem(1);

        expect(list.state.items.length).toBe(mockItems.length - 1);
        expect(list.state.items).not.toContain(item);
    });

    it('should be able to add new item', function() {

        expect(list.state.items.length).toBe(2);
        list.addItem();
        expect(list.state.items.length).toBe(3);

        let item = list.state.items.pop();

        expect(item).toEqual({
            id: "",
            name: "",
            admin: false
        });
    });
});

describe('DataManagementItem', function() {
    let mockData, columns, index, item;

    beforeEach(function() {
        mockData = {
            id: 1,
            name: 'Daniel',
            admin: true
        };

        columns = [
            { headerColumnName: 'id', dataAttributeName: 'id', inputType: 'number'},
            { headerColumnName: 'name', dataAttributeName: 'name', inputType: 'text'},
            { headerColumnName: 'admin', dataAttributeName: 'admin', inputType: 'checkbox'},
        ];

        index = 3;

        item = ReactTestUtils.renderIntoDocument(
            <DataManagementItem index={index} data={mockData} columns={columns}/>
        );
    });

    it('should render td element', function() {
        let tr = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            item, 'tr'
        );

        expect(tr.length).toBe(1);

        let tds = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            item, 'td'
        );

        let values = objectValues(mockData);

        expect(tds.length).toBe(columns.length + 3);
        expect(tds[0].textContent).toBe((index + 1).toString());

        for(let i = 0; i < columns.length; i++) {
            if (columns[i].inputType == 'checkbox') {
                if (mockData[columns[i].dataAttributeName]) {
                    expect(tds[i + 1].textContent).toBe('tak');
                } else {
                    expect(tds[i + 1].textContent).toBe('nie');
                }
            } else {
                expect(tds[i + 1].textContent).toBe(mockData[columns[i].dataAttributeName].toString());
            }
        }
    });

    it('should switch between "edit" end "show" mode', function() {
        let is_editing = item.state.editing;
        item.toggleEdit();

        expect(item.state.editing).not.toBe(is_editing);
    });
});
