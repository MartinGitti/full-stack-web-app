/*
Please follow these steps in order to run tests properly:

1st: Start backend server: 
In the terminal or command line interface
Type 'nmp start'
Please ensure that you are in the root directory of the project.

2nd: Start Frontend server:
cd to the frontend folder= cd frontend.
Type 'npm start' in frontend directory.

Ensure that both servers are running correctly.

Then cd to test folder in frontend directory.
Type 'npm test' in terminal.
All test files will run and should return passed.
*/

import React from 'react';
import renderer from 'react-test-renderer';

import Form from '../components/Form';

it('renders component correctly', () => {
    const tree = renderer.create(<Form />).toJSON();
    expect(tree).toMatchSnapshot();
});
