import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Demo extends Component{
    componentDidMount(){
        axios({
            headers: {
                
            },
            method: 'post',
            url: 'http://kanishkshah.pythonanywhere.com/api/auth/token/login',
            data: {"password": "NEWpass123",
            "email": "student3@example.com"}
        })
        .then(res => {
            console.log(res.data)
        })
    }
    render(){
        return(
            <div></div>
        )
    }
}
export default Demo;