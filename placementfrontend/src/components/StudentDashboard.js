import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Demo from './demo.js'

let token='5e79bdd34d1dbad507c9f20b37e9f9587ed796b0'
let selectedList=[];
let companyCopy=[];
let printValue=''
let categoryValue=''
let companyArray=[];
let appID=''
let outputList=[]
let outputStatus=[]

class StudentDashboard extends Component {

    constructor() {
        super()
        this.state={
            companyList: [], 
            editVisibles: {},
            companyData: [],
            outputName:'',
            outputLink:'',
            outputCategory:'',
            outputList: []
        }
    }

    componentDidMount(){
        axios.get('http://kanishkshah.pythonanywhere.com/positions/', {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    companyData: res.data
                });
            })

            axios.get('http://kanishkshah.pythonanywhere.com/applications/', {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    companyList: res.data
                });
                this.fetchItems()
            })
    }

    fetchItems(){
        outputList=[]
        outputStatus=[]
        this.state.companyList.map(p => {
            axios.get('http://kanishkshah.pythonanywhere.com/company/'+p.id, {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                outputList.push(res.data)
                outputStatus.push(p.status)
                this.setState({
                    outputList: outputList,
                })
        })
    })
    }

    addElement=(e) => {
        console.log(companyArray)
        console.log(e)
        let index=e;
        let arrayIndex=companyArray[index]
        console.log(index)
        console.log(arrayIndex)
        axios({
            headers: {
                authorization: 'Token '+token
            },
            method: 'post',
            url: 'http://kanishkshah.pythonanywhere.com/applications/'+arrayIndex.company.id,
            data: arrayIndex
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response.data)
        })
       
        if(index!=-1)
        {   
            companyArray.splice(index,1);
        }
        console.log(arrayIndex)
        this.setState({
            companyData: companyArray
        });
        axios.get('http://kanishkshah.pythonanywhere.com/applications/', {
                headers: {
                    authorization: 'Token '+token
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    companyList: res.data
                });
                this.fetchItems()
            })
        console.log(companyArray)
        
    }

    showEditDiv = id => {
        this.setState(prevState => ({
          editVisibles: {
            ...prevState.editVisibles,
            [id]: !prevState.editVisibles[id]
          }
        }));
      };

      fetchOutput(res) {
        
    }

    render() {
        companyArray=this.state.companyData
        console.log(companyArray)
        console.log(this.state.companyList)
        return (
            <div className="background_studentdashboard">
                <div className="row">
                    <div className="col-lg-5 card" id="left-card_studentdashboard">
                        <br></br>
                        <h2>NEW OPENINGS</h2>
                        <hr></hr>
                        {
                            this.state.companyData.map((p,index) => {
                                {
                                    if(p.company.category=='S')
                                    {
                                        categoryValue="Super Dream"
                                    }
                                    else if(p.company.category=="D")
                                    {
                                        categoryValue="Dream"
                                    }
                                    else
                                    {
                                        categoryValue="Regular"
                                    }
                                }
                                return (
                                    <div className="row studentCard_studentdashboard" key={index}>
                                       
                                        <div className="col">
                                            <p>{p.title}</p>
                                            <p class="companyname_studentdashboard">{p.company.name}
                                            <button className="btn expand_studentdashboard" onClick={() => this.showEditDiv(p.id)}>+</button></p>
                                            <div className={!this.state.editVisibles[p.id]? "invisible_studentdashboard": "visible_studentdashboard"}>
                                                <p class="position_studentdashboard">{categoryValue}</p>
                                                <p>{p.package}</p>
                                                <button className="btn btn-large" id="apply_studentdashboard" data_index={index} onClick={() => this.addElement(index)}>APPLY</button>
                                                <button className="companyProfile_studentdashboard btn btn-large"><a href= {'/company/'+p.id} target="_blank">know more</a></button>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-lg-5 card" id="right-card_studentdashboard">
                        <br></br>
                        <h2>APPLICATIONS</h2>
                        <hr></hr>
                        {
                            this.state.outputList.map((p, index) => {
                                
                                    if(outputStatus[index]=="1")
                                    {
                                        printValue="PUT UNDER REVIEW"
                                        p.color="review_studentdashboard"
                                    }
                                    else if(outputStatus[index]=="2")
                                    {
                                        printValue="INTERVIEW SCHEDULED"
                                        p.color="interview_studentdashboard"
                                    }
                                    else if(outputStatus[index]=="3")
                                    {
                                        printValue="SELECTED"
                                        p.color="select_studentdashboard"
                                    }
                                    else if(outputStatus[index]=="4")
                                    {
                                        printValue="REJECTED"
                                        p.color="reject_studentdashboard"
                                    }
                                    
                                return (
                                    
                                    <div className="row studentCard_studentdashboard" key={p.id}>
                                        
                                        <div className="col">
                                            <p>{p.name}</p>
                                            {console.log(p.name)}
                                            <p className={p.color}>{printValue}</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentDashboard;
