import React from 'react';
import Enzyme, { mount } from 'enzyme';
import InfoCard from '../components/InfoCard';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('InfoCard Component', () => {
    it('renders', () => {
        const wrapper = mount(<InfoCard
            name={'Restaurant'}
            price={'$$'} r
            rating={3.5}
            isClosed={false}
        />);

        //Testing component props are passed in properly
        expect(wrapper.props().name).toEqual('Restaurant');
        expect(wrapper.props().price).toEqual('$$');
        expect(wrapper.props().rating).toEqual(3.5);
        expect(wrapper.props().isClosed).toEqual(false);
    });
});