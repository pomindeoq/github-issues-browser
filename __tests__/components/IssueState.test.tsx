import React from 'react';
import renderer from 'react-test-renderer';
import IssueState from '../../components/IssueState';

it('renders correctly', () => {
    const tree = renderer.create(<IssueState state='open' />).toJSON();
    expect(tree).toMatchSnapshot();
});