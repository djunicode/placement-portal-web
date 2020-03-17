import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar=() => {
    return(
        <div>
        <div id="bar" className="fixed-top"></div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" id="active-link" href="#">RECRUITERS <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">RECORDS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">TRAINING</a>
                    </li>
                </ul>
            </div>
        </nav>
        </div>
        
    )
}

export default Navbar;
