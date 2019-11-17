import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App'
import Adapter from 'enzyme-adapter-react-16';
import SearchResultContainer from './SearchResultContainer'

Enzyme.configure({ adapter: new Adapter() });

//Testing that Root Component <App/> contains one Child Component, <SearchResultContainer/>
describe("<App />", () => {
    test("renders", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<SearchResultContainer />)).toBe(true);
    });
});