import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EditDetail from '../components/EditDetail';
import NavR2 from '../components/AddDets_navbar2';
import SidenavR from '../components/AddDets_Sidenav';
import '../css_styling/display.css';


class DisplayDetails extends Component{
 
  

  render(){


    return(
      <div className="Main2">
      <div className="header"></div>
      <div className="display_grid-main">
        <div className="SidenavR_grid-1">
          <SidenavR/>
        </div>
        <div className="grid-2">
          <NavR2/>
          <div className="display_row2">
          <EditDetail companyId ={this.props.match.params.companyId} />
          </div> 
          </div>
        </div>
     
      

    </div>
    );
    
  }
}
export default DisplayDetails;