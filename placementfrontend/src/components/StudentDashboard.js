import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

let selectedList=[];

const companies= [
    {
        id: 1,
        name: 'Manchester United',
        position: 'Web Developer',
        salary: '123',
        location: 'Manchester',
        profile_link:'https://www.manutd.com/',
        profilepicture_link:'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png',
        status: 'Selected',
        color: null
    },
    {
        id: 2,
        name: 'Borussia Dortmund',
        position: 'Software Engineer',
        salary: '456',
        location: 'Dortmund',
        profile_link:'www.abcd.com',        
        profilepicture_link:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png',
        status: 'Rejected',
        color: null
    },
    {
        id: 3,
        name: 'AC Milan',
        position: 'Data Scientist',
        salary: '789',
        location: 'Milan',
        profile_link:'www.abcd.com',
        profilepicture_link:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_of_AC_Milan.svg/1200px-Logo_of_AC_Milan.svg.png',
        status: 'Under Review',
        color: null
    }
]

let companyArray=companies;

class StudentDashboard extends Component {

    constructor() {
        super()
        this.state={
            companyList: [], 
            editVisibles: {}
        }
    }

    addElement=(company) => {
        let index=companyArray.findIndex(p=> p.name==company.target.name);
        if(companyArray[index].status=="Selected")
        {
            companyArray[index].color="select_studentdashboard";
        }
        else if(companyArray[index].status=="Rejected")
        {
            companyArray[index].color="reject_studentdashboard";
        }
        else if(companyArray[index].status=="Applied")
        {
            companyArray[index].color="interview_studentdashboard";
        }
        else if(companyArray[index].status=="Under Review")
        {
            companyArray[index].color="review_studentdashboard";
        }
        if(index!=-1)
        {   
            selectedList.push(companies[index]);
            companyArray.splice(index,1);
        }
        this.setState({
            companyList: selectedList
        });
    }

    showEditDiv = id => {
        this.setState(prevState => ({
          editVisibles: {
            ...prevState.editVisibles,
            [id]: !prevState.editVisibles[id]
          }
        }));
      };

    render() {
        return (
            <div className="background_studentdashboard">
                <div className="row">
                    <div className="col-lg-5 card" id="left-card_studentdashboard">
                        <br></br>
                        <h2>NEW OPENINGS</h2>
                        <hr></hr>
                        {
                            companyArray.map((p,index) => {
                                return (
                                    <div className="row studentCard_studentdashboard" key={p.id}>
                                        <div className="col-lg-4" >
                                            <img className="profile_pic_studentdashboard" src={p.profilepicture_link}></img>
                                            <hr></hr>
                                        </div>
                                        <div className="col-lg-8">
                                            <p>{p.name}</p>
                                            <p class="position_studentdashboard">{p.position}</p>
                                            <button className="btn expand_studentdashboard" onClick={() => this.showEditDiv(p.id)}>+</button>
                                            <div className={!this.state.editVisibles[p.id]? "invisible_studentdashboard": "visible_studentdashboard"}>
                                                <p>Rs {p.salary}</p>
                                                <p>{p.location}</p>
                                                <button className="btn btn-large" name={p.name} id="apply_studentdashboard" onClick={this.addElement}>APPLY</button>
                                                <button className="companyProfile_studentdashboard btn btn-large"><a href= {p.profile_link} target="_blank">know more</a></button>
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
                            this.state.companyList.map(p => {
                                return (
                                    <div className="row studentCard_studentdashboard" key={p.id}>
                                        <div className="col-lg-5">
                                            <img className="profile_pic_studentdashboard" src={p.profilepicture_link}></img>
                                            <hr></hr>
                                        </div>
                                        <div className="col-lg-7">
                                            <p>{p.name}</p>
                                            <p>{p.position}</p>
                                            <p className={p.color}>{p.status}</p>
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
