import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'


let token='5e79bdd34d1dbad507c9f20b37e9f9587ed796b0'
let student_id=''
let copyArray=[]
class StudentTab extends Component {

    constructor() {
        super()
        this.state={
            studentDetails: [],
            studentApp: [],
                student_name: '',
                student_profile_picture: '',
                student_pointer: '',
                student_department: '',
                student_sap: '',
                student_year: '',
                student_email: ''
        }
    }

    componentDidMount(){

        axios.get('http://kanishkshah.pythonanywhere.com/api/auth/users/me/', {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data.id)
                this.fetchItems(res.data.id)
                this.setState({
                    studentApp: res.data
                });
            })                   
    }

    fetchItems(e){
        console.log(e)
        axios.get('http://kanishkshah.pythonanywhere.com/student_profile/'+e, {
                    headers: {
                        authorization: 'Token '+token
                    }
                })
                .then(res => {
                    console.log(res.data)
                    this.setItems(res.data)
                })
                .catch(err => {
                    console.log(err.response)
                }) 
    }

    setItems(p){
        this.setState({
        student_name: p.f_name+" "+p.l_name,
        student_profile_picture: p.profile_image,
        student_pointer: p.pointer,
        student_department: p.department,
        student_sap: p.sapID,
        student_year: p.year,
        student_email: p.email
        })
    }

    render() {
        return(
            <div id="main_studentdashboard">
                {
                            <div id="content_studentdashboard">
                                {console.log(this.state.student_profile_picture)}
                                <img className="student_profile_picture_studentdashboard" src={this.state.student_profile_picture}></img>
                                <h4 className="data_studentdashboard">{this.state.student_name}</h4>
                                <h5 className="data_studentdashboard" id="email_studentdashboard">{this.state.student_email}</h5>
                                <h4 className="data_studentdashboard">{this.state.student_sap}</h4>
                                <h4 className="data_studentdashboard">{this.state.student_department}</h4>
                                <h4 className="data_studentdashboard">{this.state.student_pointer}</h4>
                                <h4 className="data_studentdashboard">{this.state.student_year}</h4> <br></br>
                                <button className="student_button_studentdashboard btn btn-lg"><img src="https://image.flaticon.com/icons/svg/61/61456.svg" id="edit_icon_studentdashboard"></img>EDIT PROFILE</button> <br></br><br></br>
                            </div>
                    }
            </div>
        )
    }
}

export default StudentTab;