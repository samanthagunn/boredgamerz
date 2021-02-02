import React from 'react'
import { render } from '@testing-library/react';
import TestComponent from '../components/TestComponent';

jest.mock('../components/Mock');

test('renders',()=>{
    const {container} = render (<TestComponent/>);
    expect (container.textContent)
    .toMatch('Test component Mock');
});