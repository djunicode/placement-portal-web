import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

let auth_token=localStorage.getItem('token')
let selectedList=[];
let arrayCopy=[];
let printValue='';
let list=[];
let outputList=[];
let outputStatus=[];
let filteredList=[];
let colorClass='';
let displayList=[];

class CompanyPage extends Component {

    constructor() {
        super()
        this.state={
            studentArray: [],
            company_id: '',
            studentDisplay: [],
            outputList: []
        }
    }

    componentDidMount(){
        axios.get('http://kanishkshah.pythonanywhere.com/applications/', {
            headers: {
                authorization: 'Token '+auth_token
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                studentArray: res.data
            });
            this.fetchItems(res.data)
        })        
        axios.get('http://kanishkshah.pythonanywhere.com/api/auth/users/me/', {
            headers: {
                authorization: 'Token '+auth_token
            }
        })
        .then(res => {
            console.log(res.data.id)
            this.setState({
                company_id: res.data.id,
            });
        })    
    }

    fetchItems(e) {
        axios.get('http://kanishkshah.pythonanywhere.com/students', {
            headers: {
                authorization: 'Token '+auth_token
            }
        })
        .then(res => {
            console.log(res.data)
            list=res.data
            this.state.studentArray.map(p => {
                for(var i=0;i<list.length;i++)
                {
                    if(p.student==list[i].id)
                    {
                        displayList.push(list[i])
                    }
                }
            })
            this.setState({
                studentDisplay: displayList,
            })
        })   
    }

    addElement= (e) =>{
        let index=e.target.getAttribute('data_index');
        let arrayIndex=arrayCopy[index]
        if(index!=-1)
        {
            let selectValue=(e.target.value);
            if(selectValue!="")
            {
                arrayCopy[index].color=selectValue+'_companypage';
                if(selectValue=="select")
                {
                    arrayCopy[index].status="3";
                }
                else if(selectValue=="reject")
                {
                    arrayCopy[index].status="4";
                }
                else if(selectValue=="interview")
                {
                    arrayCopy[index].status="2";
                }
                else if(selectValue=="review")
                {
                    arrayCopy[index].status="1";
                }
            }   
            arrayIndex=arrayCopy[index]
            selectedList.push(arrayCopy[index]);
            arrayCopy.splice(index,1);
            displayList.splice(index, 1)
            this.setState({
                studentArray: arrayCopy,
                studentDisplay: displayList
            });
            this.fetchOutput(selectedList)
        }
        axios({
            headers: {
                authorization: 'Token '+auth_token
            },
            method: 'patch',
            url: 'http://kanishkshah.pythonanywhere.com/applications/'+arrayIndex.id,
            data: {'status': arrayIndex.status,}
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
    }

    rejectUnderReview=(student) =>{
        selectedList.map(p =>{
            if(p.status=="1")
            {
                p.status="4";
            }
            axios({
                headers: {
                    authorization: 'Token '+auth_token
                },
                method: 'patch',
                url: 'http://kanishkshah.pythonanywhere.com/applications/'+p.id,
                data: {'status': p.status,}
            })
           
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        })
       this.fetchOutput(selectedList)

    }

    rejectInterview=(student) =>{
        selectedList.map(p =>{
            if(p.status=="2")
            {
                p.status="4";
            }
            axios({
                headers: {
                    authorization: 'Token '+auth_token
                },
                method: 'patch',
                url: 'http://kanishkshah.pythonanywhere.com/applications/'+p.id,
                data: {'status': p.status,}
            })
           
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        })
       this.fetchOutput(selectedList)
    }

    filterList=(student) => {
        outputList=[]
        if(student.target.value!="")
        {
        if(student.target.value=="ALL")
        {
            this.setState({
                studentList: selectedList
            })
            filteredList=selectedList
        }
        else
        {
            filteredList=selectedList.filter(function(user){
                return user.status==student.target.value
            })
        }
    }
    this.fetchOutput(filteredList)
    }

    getExcel=(e) => {
        axios.get('http://kanishkshah.pythonanywhere.com/get_xls/'+this.state.company_id, {
            headers: {
                authorization: 'Token '+auth_token
            }
        })
        .then(res => {
            console.log(res.data)
        })
    }

    fetchOutput(e) {
        outputList=[]
        outputStatus=[]
        axios.get('http://kanishkshah.pythonanywhere.com/students/', {
            headers: {
                authorization: 'Token '+auth_token
            }
        })
        .then(res => {
            console.log(res.data)
        })
        e.map(p => {
            for(var i=0;i<list.length;i++)
            {
                if(p.student==list[i].id)
                {
                    outputList.push(list[i])
                }
            }
            if(p.status=="1")
            {
                printValue="PUT UNDER REVIEW"
            }
            if(p.status=="2")
            {
                printValue="INTERVIEW SCHEDULED"
            }
            if(p.status=="3")
            {
                printValue="ACCEPTED"
            }
            if(p.status=="4")
            {
                printValue="REJECTED"
            }
            outputStatus.push(printValue)                                    
        })
        this.setState({
            outputList: outputList
        });
    }

    render() {
        arrayCopy=this.state.studentArray
        console.log(this.state.studentDisplay)
        console.log(this.state.outputList)

        return (
            <div className="background_companypage">
                <div className="row">
                    <div className="col-lg-5 card" id="left-card_companypage">
                        <br></br>
                        <h2>APPLICANTS TO BE REVIEWED</h2>
                        <hr></hr>
                        {
                            this.state.studentDisplay.map((p, index) => {
                                return(
                                <div className="row studentCard_companypage">
                                    <div className="col-lg-5">
                                        <img className="profile_pic_companypage" src={p.profile_image}></img>
                                        <hr></hr>
                                    </div>
                                    <div className="col-lg-7">
                                <p class="data_companypage">{p.f_name} {p.l_name}</p>
                                        <p class="data_companypage">{p.sap_ID}</p>
                                        <p class="data_companypage">{p.department}   {p.year}</p>
                                        <select className="form-control"  id="changeStatus_companypage" value="" data_index={index} position={p.position} onChange={this.addElement}>
                                            <option value="">UPDATE STATUS</option>
                                            <option className="select_companypage" value="select">SELECT</option>
                                            <option className="interview_companypage" value="interview">SCHEDULE INTERVIEW</option>
                                            <option className="review_companypage" value="review">PUT UNDER REVIEW</option>
                                            <option className="reject_companypage" value="reject">REJECT</option>
                                        </select> <br></br>
                                        <button className="profile_companypage btn btn-large"><a href= {'/Studentprofile/'+p.id} target="_blank">profile</a></button>
                                        <hr></hr>
                                    </div>
                                </div>
                                )
                            })
                        }
                        <button className="rejectButton_companypage rejectReview_companypage btn btn-small" onClick={this.rejectUnderReview}>Reject All Under Review</button>
                        <button className="rejectButton_companypage btn btn-small" onClick={this.rejectInterview}>Reject All Scheduled For Interview</button>
                        <button className="btn btn-large excel-left_companypage" onClick={this.getExcel}>EXCEL</button>
                    </div>
                    <div className="col-lg-5 card" id="right-card_companypage">
                        <br></br>
                        <h2 id="reviewedApps_companypage">ALREADY REVIEWED APPLICATIONS</h2> <br></br>
                        <div className="row">
                            <div className="col-lg-3">
                            <img src="https://image.flaticon.com/icons/svg/1159/1159641.svg" class="filterIcon_companypage"></img>
                            </div>
                            <div className="col-lg-9">
                            <select className="form-control" id="filterStudents_companypage" onChange={this.filterList} status={this.status}>
                                <option value="ALL">ALL</option>
                                <option value="3" className="select_companypage">ACCEPTED</option>
                                <option value="2" className="interview_companypage">INTERVIEW SCHEDULED</option>
                                <option value="1" className="review_companypage">PUT UNDER REVIEW</option>
                            </select>
                            </div>
                            </div>
                        <hr></hr>
                        {
                            this.state.outputList.map((p, index) =>{
                                {
                                    if(outputStatus[index]=='PUT UNDER REVIEW')
                                    {
                                        colorClass='review_companypage'
                                    }
                                    else if(outputStatus[index]=='INTERVIEW SCHEDULED')
                                    {
                                        colorClass='interview_companypage'
                                    }
                                    else if(outputStatus[index]=='ACCEPTED')
                                    {
                                        colorClass='select_companypage'
                                    }
                                }
                                if(outputStatus[index]!="REJECTED")
                                {
                                return (
                                    <div className="row studentCard_companypage">
                                        <div className="col-lg-5">
                                            <img className="profile_pic_companypage" src={p.profile_image}></img>
                                            <hr></hr>
                                        </div>
                                        <div className="col-lg-7">        
                                            <p class="data_companypage">{p.f_name} {p.l_name}</p>
                                            <p class="data_companypage">{p.sap_ID}</p>
                                            <p class="data_companypage">{p.department}  {p.year}</p>
                                            <p className={colorClass}>{outputStatus[index]}</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                )}
                            })
                        }
                        <button className="btn btn-large excel-right_companypage"
                         onClick={this.getExcel}>EXCEL</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyPage;