import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  dummy from "../assets/dummy.png";
import Sidenav from './Sidenav';
import axios from 'axios';
class Body extends Component{
    constructor(props){
        super(props)
        this.state= {
            f_name:'',
            l_name:'',
            department:'',
            sap_ID:'',
            pointer:'',
            email:'',
            year:'',
            profile_image:''
        }   
    } 
    componentDidMount(){ 
        axios.get(`http://kanishkshah.pythonanywhere.com/students/${this.props.studentId}`,{
          headers: {
            'Authorization':'Token '+'43e81114f13b0e7a2384d95ed0116997babeff30'}})
        .then(res => {
          const student = res.data
          console.log(res.data);
          this.setState({
              f_name: student.f_name,
              l_name: student.l_name,
              department: student.department,
              sap_ID: student.sap_ID,
              pointer: student.pointer,
              email: student.email,
              year: student.year,
              profile_image:student.profile_image,

          })
          console.log(this.state)
        }) 
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state)
    }
    handleSubmit=(e)=>{
        const studentUpdated = 
        {   
            f_name:this.state.f_name,
            l_name:this.state.l_name,
            department:this.state.department,
            sap_ID:this.state.sap_ID,
            pointer:this.state.pointer,
            email:this.state.email,
            year:this.state.year,  
        }
        console.log(studentUpdated)
        axios.put(`http://kanishkshah.pythonanywhere.com/student_profile/${this.props.studentId}`,studentUpdated,{
          headers: {
            'Authorization':'Token '+'ee4e5da60264eb2d743b7f17b5563c28584482f3'}})      
        .then(res=>{
            console.log(res.data)
        })  
        e.preventDefault();
        console.log(this.state)
    }
    render(){
        const student=this.state
    return(
        <div className="container-fluid">
            <div  className="row d-flex py-5">
                <Sidenav />
                <div className="col-lg-10">
                    <div className="row py-4">
                    </div>
                    <div className="row m-3 ">
                        <div className="col-12 pt-3 Studentprofile_box">                         
                            <div className="col-10  p-0 Studentprofile_inner_box "> 
                                    <img src={this.state.profile_image} alt="profile" className="Studentprofile_pic2" /> 
                                    <h2 className="Studentprofile_head">{this.state.f_name} {this.state.l_name}</h2>
                                    <div className="row">
                                        <div className="col-12">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="Studentprofile_details">
                                            <label>First Name : </label>
                                            <input type="text" name="f_name" className ="Studentprofile_studentdisplay " defaultValue={this.state.f_name} placeholder="First Name"  onChange={this.handleChange} required/>                                                
                                            <br />
                                            <label>Last Name : </label>
                                            <input type="text" name="l_name" className ="Studentprofile_studentdisplay  " defaultValue={this.state.l_name} placeholder="Last Name" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align1">SAP ID : </label>
                                            <input type="text" name="sap_ID" pattern="[0-9]{10,12}" title="Sap Id must contain 10 to  12 numbers"  className =" Studentprofile_align1 Studentprofile_studentdisplay " defaultValue={this.state.sap_ID} placeholder="Sap-Id" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align2">Pointer :</label> 
                                            <input type="text" name="pointer" className ="Studentprofile_align2 Studentprofile_studentdisplay " defaultValue={this.state.pointer} placeholder="Pointer" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align3">Department :</label>
                                            <input type="text" name="department" className ="Studentprofile_align3 Studentprofile_studentdisplay " defaultValue={this.state.department} placeholder=" Department" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align4">Year : </label>
                                            <input type="text" name="year" className ="Studentprofile_align4 Studentprofile_studentdisplay " defaultValue={this.state.year} placeholder=" Year" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align5">Email ID: </label>
                                            <input type="email" name="email" className ="Studentprofile_align5 Studentprofile_studentdisplay " defaultValue={this.state.email} placeholder="Email-Id" onChange={this.handleChange} required/>
                                            
                                            <br /><br /><button  className="Studentprofile_edit">Update</button>
                                            </div>
                                        </form>
                                        </div>                                 
                                </div>
                            </div>                  
                        </div>                    
                    </div>
                </div>        
            </div>    
       </div>
    );
}
}
export default Body;