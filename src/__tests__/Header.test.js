import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Header from '../components/header';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<Header />', ()=> {
    test('header renders', () => {
        const wrapper = shallow(<Header />);

        //Testing basically that component exists
        expect(wrapper.exists()).toBe(true);
    });
});