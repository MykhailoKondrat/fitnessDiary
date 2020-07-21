import React from "react";
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavbarTab from "./NavbarTab";
import {NavLink} from "react-router-dom";
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
// configure({adapter:new Adapter()});

describe('<NavbarTab/>', ()=> {
  let wrapper;
  beforeEach( () => {
     wrapper = shallow(<NavbarTab link='/' exact={true}/>);
  });
  
  it('Should Render Navlink',
    () => {
      expect( wrapper.find(NavLink )).toHaveLength(1);
    });
 
})