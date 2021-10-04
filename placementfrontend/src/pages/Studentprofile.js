import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from '../components/Body';
import '../css_styling/Studentprofile.css';

class App extends Component{
  render(){
  return (    
    <div className="App">
      <div className="row">
        <header className="Studentprofile_rectangle"></header>
      </div> 
      <Body studentId={this.props.match.params.studentId}/>    
    </div>
  );
}
}

export default App;
