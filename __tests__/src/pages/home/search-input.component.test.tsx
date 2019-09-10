import SearchInput from '../../../../src/pages/home/search-input.component';
import Home from '../../../../src/pages/home/home';
import React from 'react';
import renderer from 'react-test-renderer';
// beforeAll(() => { 
//     jest.mock('@react-native-community/async-storage');
//   })
  test('renders correctly', () => {
    const component = renderer.create(
        <SearchInput/>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
  });