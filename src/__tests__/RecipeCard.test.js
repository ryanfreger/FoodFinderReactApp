import React from 'react';
import Enzyme, { mount } from 'enzyme';
import RecipeCard from '../components/RecipeCard';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('RecipeCard Component', () => {
    it('renders', () => {
        const wrapper = mount(<RecipeCard
            recipeLabel={['Vegan', 'Healthy']}
            recipeCalories={350}
            yield={1}
            totalCarbs={20}
            totalProtein={30}
            totalFat={10}
        />);

        //Testing component props are passed in properly
        expect(wrapper.props().recipeLabel).toEqual(['Vegan', 'Healthy']);
        expect(wrapper.props().recipeCalories).toEqual(350);
        expect(wrapper.props().yield).toEqual(1);
        expect(wrapper.props().totalCarbs).toEqual(20);
        expect(wrapper.props().totalProtein).toEqual(30);
        expect(wrapper.props().totalFat).toEqual(10);
    });
});