import React from 'react';
function Search(){
    return(
        <div className="float-right">                  
            <form className="form-group float-right">
               <input className="form-control inp" type="search" placeholder="Search"/>
                <button className="btn "><i className="fa fa-search glass"></i></button>       
            </form>
         </div> 
    );
}
export default Search;