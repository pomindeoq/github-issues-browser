import React from 'react';
import renderer from 'react-test-renderer';
import UserAvatar from '../../components/UserAvatar';
import Page1 from '../__mocks__/Issues/Page1.json'

it('renders correctly', () => {
    const tree = renderer.create(<UserAvatar user={Page1.data.items[0].user} />).toJSON();
    expect(tree).toMatchSnapshot();
});