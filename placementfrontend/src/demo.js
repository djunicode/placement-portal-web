import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Demo extends Component{
    componentDidMount(){
        axios({
            headers: {
                "password": "pass@123",
                "email": "tpo1@djsce.ac.in"
            },
            method: 'post',
            url: 'http://kanishkshah.pythonanywhere.com/auth/token/login/',
        })
        .then(res => {
            console.log(res.data)
        })
    }
}
export default Demo;