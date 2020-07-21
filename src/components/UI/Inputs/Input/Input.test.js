import React from "react";
import {configure,shallow} from 'enzyme';
import { shallowToJson  } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Input from "./Input";


describe('<Input/>', ()=> {
  let wrapper;
  beforeEach( () => {
    wrapper = shallow(<Input />);
  });
  it('should render error paragraph with correct message',  () =>{
    wrapper.setProps({
      valid:false,
      touched:true,
      errorMessage:'Test error message'
    });
    expect(wrapper.find('p.errorMessage')).toHaveLength(1);
    expect(wrapper.find('p.errorMessage').text()).toEqual('Test error message');
  });
 
  it('render correctly Input component', () => {
    // const InputComponent = shallow(<Input valid={false} touched/>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
})