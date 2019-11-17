import React from 'react';
import SearchBar from '../components/SearchBar';
import renderer from 'react-test-renderer';

//Testing basic Rendering of the component
it('Should render without crashing', () => {
    const rendered = renderer.create(<SearchBar />).toJSON();
    expect(rendered).toBeTruthy();
})

//Testing the term (food type) field and setting state based on user input
it('Should change if term is entered', () => {
    const termValue = renderer.create(<SearchBar />).getInstance();
    termValue.handleTermChange({ target: { value: 'TEST!!!' } });
    expect(termValue.state.term).toEqual('TEST!!!');
});