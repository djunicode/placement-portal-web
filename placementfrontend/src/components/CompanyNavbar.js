import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar=() => {
    return(
        <div>
        <div id="bar" className="fixed-top"></div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto" id="left-space">
                    <li class="nav-item">
                        <a class="nav-link" href="#">NAME</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" id="active-link" href="#">APPLICANTS <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <span id="search-text">Search</span>
                    <span id="search-bar">
                        <input class="mr-sm-2" type="search" aria-label="Search" id="search"></input>
                        <a href="#"><img id="search-icon" src="https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-search-icon-by-vexels.png"></img></a>
                    </span>
                </form>
            </div>
        </nav>
        </div>
        
    )
}

export default Navbar;
