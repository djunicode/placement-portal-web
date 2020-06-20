import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

let token='43e81114f13b0e7a2384d95ed0116997babeff30'

class Navbar extends Component {
    constructor() {
        super()
        this.state={
           
        }
    }


handleClick= (e) => {
    axios('http://kanishkshah.pythonanywhere.com/api/auth/token/logout/', {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res =>{
                localStorage.removeItem('token')
            })
}

render() {
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
                        <input class="mr-sm-2" type="search" aria-label="Search" id="search_companypage"></input>
                        <a href="#"><img id="search-icon_companypage" src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-search-icon-by-vexels.png"></img></a>
                    </span>
                </form>
            </div>
        </nav>
        </div>
        
    )
}
}
export default Navbar;
