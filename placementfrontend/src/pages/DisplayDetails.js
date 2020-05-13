import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EditDetail from '../components/EditDetail';
import Nav2 from '../components/navbar2';
import Sidenav from '../components/Sidenav';
import '../css_styling/display.css';

class DisplayDetails extends Component{
 

  render(){
    return(<div className="main2">
    <div className="header"></div>
    <div className="grid-main">
      <div className="grid-1">
       <Sidenav/>
      </div>
      <div className="grid-2">
        <Nav2/>
        <div className="mainGrid2">
       <EditDetail/></div>
      </div>
    </div>
    

  </div>);
    
  }
}
export default DisplayDetails;