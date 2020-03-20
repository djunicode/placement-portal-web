import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  dummy from "../assets/dummy.png";
import Sidenav from './Sidenav';
class Body extends Component{
    state= {
        fname: 'ABC',
        lname: 'XYZ',
        sap: 123456789 ,
        ptr: 10 ,
        year:'II',
        dept:'Computer',
        mail:'abc@gmail.com',
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    handleSubmit=(e)=>{
        
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
                        <div className="col-12 pt-3 box">                         
                            <div className="col-10  p-0 inner_box "> 
                                    <img src={dummy} alt="profile" className="pic2" /> 
                                    <h2 className="head">{student.fname} {student.lname}</h2>
                                    <div className="row">
                                        <div className="col-12">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="details">
                                            <input type="text" name="fname" className ="studentdisplay " defaultValue={student.fname} placeholder="First Name"  onChange={this.handleChange} required/>
                                            <br />
                                            <input type="text" name="lname" className ="studentdisplay  " defaultValue={student.lname} placeholder="Last Name" onChange={this.handleChange} required/>
                                            <br /><input type="text" name="sap" className ="studentdisplay " defaultValue={student.sap} placeholder="Sap-Id" onChange={this.handleChange} required/>
                                            <br /><input type="text" name="ptr" className ="studentdisplay " defaultValue={student.ptr} placeholder="Pointer" onChange={this.handleChange} required/>
                                            <br /><input type="text" name="dept" className ="studentdisplay " defaultValue={student.dept} placeholder=" Department" onChange={this.handleChange} required/>
                                            <br /><input type="text" name="year" className ="studentdisplay " defaultValue={student.year} placeholder=" Year" onChange={this.handleChange} required/>
                                            <br /><input type="text" name="mail" className ="studentdisplay " defaultValue={student.mail} placeholder="Email-Id" onChange={this.handleChange} required/>
                                            
                                            <br /><br /><button  className="edit">Update</button>
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