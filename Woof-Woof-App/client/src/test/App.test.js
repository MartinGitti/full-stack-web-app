/*
Please follow these steps in order to run tests properly:

Start front & back end servers with 'npm run dev',
in root director of project folder.

Ensure that both servers are running correctly.

Then cd to test folder in frontend directory,
with 'cd client'.
Once in client directory,
Type 'npm test' in terminal.
All test files will run and should return passed.
*/
import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header';

test('renders text in element', () => {
  const { getByText } = render(<Header />)
  const textElement = getByText('Woof Woof Barker', { exact: true });
  expect(textElement).toBeInTheDocument();
});

