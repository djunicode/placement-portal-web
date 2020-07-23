import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from "react-router-dom";

let auth_token='97bf5d419a6d783a367e7936828be4df45726bd2'
let list=[]

class Navbar extends Component {
    constructor() {
        super()
        this.state={
           input:'',
           redirect: null
        }
    }

fetchItems(e) {
    e.preventDefault()
    let student_name=this.state.input
    axios.get('http://kanishkshah.pythonanywhere.com/students', {
        headers: {
            authorization: 'Token '+auth_token
        }
    })
    .then(res => {
        console.log(res.data)
        list=res.data
    })
    for (var i=0;i<list.length;i++)
    {
        if(student_name==(list[i].f_name+" "+list[i].l_name))
        {
            console.log(list[i].id);
            this.setState({
                redirect: "/Studentprofile/"+list[i].id
            });
        }
    }   
}

handleChange= (e) => {
    this.setState({ input: e.target.value });
  }

handleClick= (e) => {
    axios('http://kanishkshah.pythonanywhere.com/api/auth/token/logout/', {
        headers: {
            authorization: 'Token '+auth_token
        }
    })
    .then(res =>{
        localStorage.removeItem('token')
    })
}

render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }
    return(
        <div>
            <div id="bar_companypage" className="fixed-top"></div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light top_companypage">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto" id="left-space_companypage">
                        <li class="nav-item">
                            <a class="nav-link company_link" href="/display">NAME</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link company_link" id="active-link_companypage" href="/CompanyMain">APPLICANTS <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <button class="btn btn-md" id="logout_companynavbar" onClick={this.handleClick}>Logout</button>
                    <form class="form-inline my-2 my-lg-0">
                        <span id="search-text_companypage">Search</span>
                        <span id="search-bar_companypage">
                            <input class="mr-sm-2" type="search" aria-label="Search" id="search_companypage" onChange={e => this.handleChange(e)}></input>    
                            <button class="search_button_companynav" onClick={e => this.fetchItems(e)}><img id="search-icon_companypage" src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-search-icon-by-vexels.png"></img></button>
                        </span>
                    </form>
                </div>
            </nav>
        </div>  
    )
}
}
export default Navbar;
