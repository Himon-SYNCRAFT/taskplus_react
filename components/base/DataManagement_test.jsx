import React from 'react';
import ReactTestUtils from '../../node_modules/react-addons-test-utils/index.js';
import {DataManagementList, DataManagementItem} from './DataManagement.jsx';
import {objectValues} from '../../lib/helpers.js'

describe('DataManagementList', function() {
    it("should render table with given id and header columns", function() {
        let htmlId = 'my-list';
        let headerColsNames = ['id', 'name'];
        let list = ReactTestUtils.renderIntoDocument(
            <DataManagementList htmlId={htmlId} headerCols={headerColsNames}/>
        );

        let table = ReactTestUtils.findRenderedDOMComponentWithTag(
            list, 'table'
        );

        expect(table.id).toBe(htmlId);

        let ths = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            list, 'th'
        );

        expect(ths.length).toBe(2);
    });
});

describe('DataManagementItem', function() {
    it('should render td element', function() {
        let mockData = {
            id: 1,
            name: 'Daniel',
            login: 'admin'
        };

        let item = ReactTestUtils.renderIntoDocument(
            <DataManagementItem data={mockData} />
        );

        let tr = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            item, 'tr'
        );

        expect(tr.length).toBe(1);

        let tds = ReactTestUtils.scryRenderedDOMComponentsWithTag(
            item, 'td'
        );

        expect(tds.length).toBe(3);

        let values = objectValues(mockData);

        for(let i = 0; i < values.length; i++) {
            expect(tds[i].textContent).toBe(values[i].toString());
        }
    });
});
