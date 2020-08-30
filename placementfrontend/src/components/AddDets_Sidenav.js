import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Profile from '../assets/default.png';
import '../css_styling/addComp.css';



class SidenavR extends Component{
  state={
    details:{}
  }

  componentDidMount(){
    axios.get(`http://kanishkshah.pythonanywhere.com/coordinator/${this.props.coordinatorId}`)
  .then(res=>{
      this.setState({
          details:res.data
      })
      console.log(this.state.details)
  })
  .catch(err => console.log(err));
}
  render(){
    const details=this.state.details
    return(     
      <div className="container">
      <div className="profimg">
<img src={details.profile_image} alt="img" className="SidenavR_center SidenavR_imgno" />
<h4 className="SidenavR_centerH"> {details.f_name} {details.l_name}</h4>
<p className="SidenavR_centerP ">{details.email}</p>
<p className="SidenavR_centerP">{details.department}</p>
<p className="SidenavR_centerP">{details.role}</p>
</div> 
</div>
       
    )
  }
    }

  export default SidenavR;  