import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

let auth_token=localStorage.getItem('token')

class StudentTab extends Component {

    constructor() {
        super()
        this.state={
            studentDetails: [],
            coordinator_name: '',
            coordinator_profile_picture: '',
            coordinator_role: '',
            coordinator_department: '',
            coordinator_username: '',
            coordinator_email:''
        }
    }

    componentDidMount(){
        axios.get('http://kanishkshah.pythonanywhere.com/api/auth/users/me/', {
            headers: {
                authorization: 'Token '+auth_token
            }
        })
        .then(res => {
            console.log(res.data)
            this.fetchDetails(res.data.id)
            this.setState({
                studentDetails: res.data
            });
        })                   
    }

    fetchDetails(e){
        console.log(e)
        axios.get('http://kanishkshah.pythonanywhere.com/coordinator/'+e, {
            headers: {
                authorization: 'Token '+auth_token
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
            coordinator_name: p.f_name+" "+p.l_name,
            coordinator_profile_picture: p.profile_image,
            coordinator_role: p.role,
            coordinator_department: p.department,
            coordinator_username: p.username,
            coordinator_email: p.email
        })
    }

    render() {
        return(
            <div id="main_companypage">
                {
                    <div id="content_companypage">
                        <img className="student_profile_picture_companypage" src={this.state.coordinator_profile_picture}></img>
                        <h4 class="info_companypage">{this.state.coordinator_name}</h4>
                        <h4 class="info_companypage">{this.state.cordinator_username}</h4>
                        <h6 class="info_companypage">{this.state.coordinator_email}</h6>
                        <h4 class="info_companypage">{this.state.coordinator_role}</h4>
                        <h4 class="info_companypage">{this.state.coordinator_department}</h4>
                    </div>

                }
            </div>
        )
    }
}

export default StudentTab;