import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

let token='43e81114f13b0e7a2384d95ed0116997babeff30'
let selectedList=[];
let arrayCopy=[];
let printValue=''
let list_ids=[]
let list_ids2=[]
let list=[]
let dummyList=[]
let outputList=[]
let outputStatus=[]
let filteredList=[]
let colorClass=''
class CompanyPage extends Component {

    constructor() {
        super()
        this.state={
            studentList: [], 
            studentArray: [],
            company_id: '',
            studentDisplay: [],
            dummyDisplay: [],
            outputImage:'',
            outputName:'',
            outputSap:'',
            outputDep:'',
            outputYear:'',
            outputList: []
        }
    }

    componentDidMount(){
        axios.get('http://kanishkshah.pythonanywhere.com/applications/', {
                headers: {
                    authorization: 'Token '+token
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
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                console.log(res.data.id)
                this.setState({
                    company_id: res.data.id,
                });
            })    
    }

    fetchItems(e) {
        e.map(p => {
            console.log(p.student)
            list_ids.push(p.student)
        })
        console.log(list_ids)
        list_ids.map(p => {axios.get('http://kanishkshah.pythonanywhere.com/students/'+p, {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                list.push(res.data)
                this.setState({
                    studentDisplay: list,
                });
            })
            
           })
           console.log(this.state.studentDisplay)
    }

    addElement= (e) =>{
        console.log(arrayCopy)
        console.log(e.target)
        let index=e.target.getAttribute('data_index');
        let arrayIndex=arrayCopy[index]
        let dummyIndex=dummyList[index]
        console.log(index)
        console.log(arrayIndex.status)
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
                else
                {
                    arrayCopy[index].status="1";
                }
            }   
            arrayIndex=arrayCopy[index]
            console.log(arrayIndex.status)
            selectedList.push(arrayCopy[index]);
            arrayCopy.splice(index,1);
            list.splice(index, 1)
            list_ids.splice(index, 1)
            console.log(arrayCopy)
            console.log(arrayIndex.id)
            this.fetchOutput(selectedList)
        }
        this.setState({
            studentList: selectedList,
            studentArray: arrayCopy,
            studentDisplay: list
        });
       
        console.log(arrayIndex)
        axios({
            headers: {
                authorization: 'Token '+token
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
                    authorization: 'Token '+token
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
       this.setState({
           studentList: selectedList
       })
       outputList=[]
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
                    authorization: 'Token '+token
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
       this.setState({
           studentList: selectedList
       })
       outputList=[]
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
            let reviewedList=selectedList.filter(function(user){
            return user.status!="4"
        })
        console.log(reviewedList)
        filteredList=selectedList.filter(function(user){
                return user.status==student.target.value
        })
        console.log(filteredList)
        this.setState({
            studentList: filteredList
        })
        }
    }
    this.fetchOutput(filteredList)
    }

    getExcel=(e) => {
        axios.get('http://kanishkshah.pythonanywhere.com/get_xls/'+this.state.company_id, {
            headers: {
                authorization: 'Token '+token
            }
        })
        .then(res => {
            console.log(res.data)
        })
    }

    fetchOutput(e) {
        outputList=[]
        outputStatus=[]
        console.log(e)
        e.filter(function(user){
            return user.status!="4"
        }).map(p =>{
            
                if(p.status=="1")
                {
                    printValue="PUT UNDER REVIEW"
                }
                else if(p.status=="2")
                {
                    printValue="INTERVIEW SCHEDULED"
                }
                else
                {
                    printValue="ACCEPTED"
                }
                outputStatus.push(printValue)
        })
        console.log(selectedList)
        console.log(outputStatus)
        console.log(e)
        e.filter(function(user){
            return user.status!="4"
        }).map( p=> {
        axios.get('http://kanishkshah.pythonanywhere.com/students/'+p.student, {
                                        headers: {
                                            authorization: 'Token '+token
                                        }
                                    })
                                    .then(res => {
                                        console.log(res.data)
                                        if(p.status!='4'){
                                        outputList.push(res.data)
                                        this.setState({
                                            outputList: outputList
                                        })}
                                    });
                                    console.log(outputList)
        
    })
    }

    render() {
        arrayCopy=this.state.studentArray
        dummyList=this.state.studentDisplay
        console.log(arrayCopy)
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
                                <div className="row studentCard_companypage" key={p.id}>
                                    <div className="col-lg-5">
                                        <img className="profile_pic_companypage" src={p.profile_image}></img>
                                        <hr></hr>
                                    </div>
                                    <div className="col-lg-7">
                                <p class="data_companypage">{p.f_name} {p.l_name}</p>
                                        <p class="data_companypage">{p.sap_ID}</p>
                                        <p class="data_companypage">{p.department}   {p.year}</p>
                                        <select className="form-control" id="changeStatus_companypage" value={this.state.selectValue} data_index={index} position={p.position} onChange={this.addElement}>
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
                                )})
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
                                return (
                                    <div className="row studentCard_companypage" key={p.id}>
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
                                )
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