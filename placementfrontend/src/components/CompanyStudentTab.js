import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

let token='43e81114f13b0e7a2384d95ed0116997babeff30'
let categoryValue=''

class StudentTab extends Component {

    constructor() {
        super()
        this.state={
            studentDetails: [],
            company_name: '',
            company_category: '',
            company_link: '',
            company_profile_picture: '',
            company_email: ''
        }
    }

    componentDidMount(){

        axios.get('http://kanishkshah.pythonanywhere.com/api/auth/users/me/', {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                this.fetchItems(res.data.id)
                this.setItems(res.data)
                this.setState({
                    studentDetails: res.data
                });
            })                   
    }

    fetchItems(e){
 
    }

    setItems(p){
        this.setState({
        company_name: p.name,
        company_category: p.category,
        company_link: p.link,
        company_email: p.email
        })
    }

    render() {
        if(this.state.company_category=='S')
                                                {
                                                    categoryValue="Super Dream"
                                                }
                                                else if(this.state.company_category=="D")
                                                {
                                                    categoryValue="Dream"
                                                }
                                                else if(this.state.company_category=="R")
                                                {
                                                    categoryValue="Regular"
                                                }
        return(
            <div id="main_companypage">
                {
                            <div id="content_companypage">
                                <img className="student_profile_picture_companypage" src={this.state.company_profile_picture}></img>
                                <h4 class="info_companypage">{this.state.company_name}</h4>
                                <h6 class="info_companypage">{this.state.company_email}</h6>
                                <h4 class="info_companypage">{categoryValue}</h4>
                                <h6 class="info_companypage" id="link_companypage"><a href={this.state.company_link} target="_blank" id="companylink_companypage">{this.state.company_link}</a></h6>
                            </div>
                }
            </div>
        )
    }
}

export default StudentTab;