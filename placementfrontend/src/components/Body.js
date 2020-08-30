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
            profile_image:'',
            file:'',    
            msg_year:'',  
            msg_email:'',
            msg_sap_1:'' ,
            msg_sap_2:'' ,   
        }   
    } 
    componentDidMount(){ 
        axios.get(`http://kanishkshah.pythonanywhere.com/student_profile/${this.props.studentId}`,{
          headers: {
            'Authorization':'Token '+'e4f1d93056d08395bb97cd21b183f8b7492e413a'}})
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


    handleImageChange=(e)=>{
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0]; 
        reader.onloadend = () => {
          this.setState({
            profile_image: reader.result,
            file:file
          });
          
        }
        reader.readAsDataURL(file)
        
      }
      handleSelectChange=(e)=>{
        this.setState({
            department : e.target.value
        });
      }
    handleSubmit=(e)=>{
        const pointer = Number(this.state.pointer)
        let formdata = new FormData()
        if(this.state.file != ''){
            formdata.append('profile_image',this.state.file) 
        }
        formdata.append('f_name',this.state.f_name)
        formdata.append('l_name',this.state.l_name)
        formdata.append('department',this.state.department)
        formdata.append('sap_ID',this.state.sap_ID)
        formdata.append('pointer',pointer)
        formdata.append('email',this.state.email)
        formdata.append('year',this.state.year)  

/*         const studentUpdated = 
        {   
            f_name:this.state.f_name,
            l_name:this.state.l_name,
            department:this.state.department,
            sap_ID:this.state.sap_ID,
            pointer:this.state.pointer,
            email:this.state.email,
            year:this.state.year,  
            profile_image:this.state.file
        }
        console.log(studentUpdated) */

        axios.patch(`http://kanishkshah.pythonanywhere.com/student_profile/${this.props.studentId}`,formdata,{
          headers: {
            'Authorization':'Token '+'e4f1d93056d08395bb97cd21b183f8b7492e413a'}})      
        .then(res=>{
            console.log(res.data);
            this.setState({
                msg_year:'',
                msg_email:'',
                msg_sap_1:'',
                msg_sap_2:''
            })
        }) 
        .catch(e => {
            console.log(e.response);
            if(e.response.data.year){
                this.setState({
                    msg_year:e.response.data.year
                })
            }
            if(e.response.data.email){
                this.setState({
                    msg_email:e.response.data.email
                })
            }
            if(e.response.data.sap_ID[0]){
                this.setState({
                    msg_sap_1:e.response.data.sap_ID[0]
                })
            }
            if(e.response.data.sap_ID[1]){
                this.setState({
                    msg_sap_2:e.response.data.sap_ID[1]
                })
            }
          });
        e.preventDefault();
        console.log(this.state)
    }
    render(){
        const student=this.state
    return(
        <div className="container-fluid">
            <div  className="row d-flex py-5">
                {/* <Sidenav /> */}
                <div className="col-lg-10 mx-auto">
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
                                            <input type="text" name="sap_ID"   className =" Studentprofile_align1 Studentprofile_studentdisplay " defaultValue={this.state.sap_ID} placeholder="Sap-Id" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align2">Pointer :</label> 
                                            <input type="number" step=".01" min="0" max="10" name="pointer" className ="Studentprofile_align2 Studentprofile_studentdisplay " defaultValue={this.state.pointer} placeholder="Pointer" onChange={this.handleChange} required/>
                                            <br />
                                           <label className="align3">Department :</label>
                                           <select value={this.state.department} name="department" onChange={this.handleSelectChange}  className ="Studentprofile_align3 select Studentprofile_studentdisplay ">                       
                                            <option value="COMPS">COMPS</option>
                                            <option value="IT">IT</option>
                                            <option value="EXTC">EXTC</option>
                                            <option value="ELEX">ELEX</option>
                                            <option value="PROD">PROD</option>
                                            <option value="MECH">MECH</option>
                                            <option value="CHEM">CHEM</option>
                                            <option value="BIO">BIO</option>
                                            </select> 
                                            <br />
                                            <label className="align4">Year : </label>
                                            <input type="text" name="year" className ="Studentprofile_align4 Studentprofile_studentdisplay " defaultValue={this.state.year} placeholder=" Year" onChange={this.handleChange} required/>
                                            <br />
                                            <label className="align5">Email ID : </label>
                                            <input type="email" name="email" className ="Studentprofile_align5 Studentprofile_studentdisplay " defaultValue={this.state.email} placeholder="Email-Id" onChange={this.handleChange} required/>
                                            <br/>
                                            <label className="align6">Profile Image : </label>
                                            <input type="file"  accept="image/*" name="profile_image" className ="Studentprofile_align6 Studentprofile_studentdisplay" onChange={this.handleImageChange} />
                                            <br /><br /><button  className="Studentprofile_edit">Update</button>
                                            <br/> 
                                            <div className="Studentprofile_message">
                                                <p>{this.state.msg_sap_1} </p>
                                                <p>{this.state.msg_sap_2} </p>
                                                <p>{this.state.msg_year} </p>
                                                <p>{this.state.msg_email} </p>
                                            </div>
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