import React from 'react';
import TimePicker from 'react-time-picker';


class DayTime extends React.Component{

constructor(){
  super();
  this.state={
    checked:"",
    startTime:'00:00',
    endTime:'00:00'
  }
}

handleCheck = (event) => {
  var checkBox = event.target;
  var name = event.target.name;
  checkBox.checked? this.setState({checked: name}): this.setState({checked: ''});
}

onStartChange = time => {
  this.setState({
    startTime:time
   })
}

onEndChange = time =>{
  this.setState({
    endTime:time
  })
}

render(){
  return(
    <div>
    <div className="form-row ml-4">
    <div className="col-lg-3 ml-2" >
      <input name={this.props.day}  onClick={this.handleCheck} type="checkbox" className=" col-lg-1" style={{cursor:'pointer'}}/>
      <label className=" col-lg-3"  style={{fontSize:"20px", textAlign:"left", color:"#4B66EA"}}>{this.props.day}</label>
    </div>
    <div className="col-lg-8 form-row ml-5" id={this.props.day} >
      <div className="col-lg-5" style={{marginLeft:"20px"}}>
      <TimePicker
          name="startTime"
          onChange={this.onStartChange}
          value={this.state.startTime}
          disabled={this.state.checked===this.props.day? false:true}
        />
        </div>
        <span>:</span>
        <div className="col-lg-5">
        <TimePicker
        name="endTime"
          onChange={this.onEndChange}
          value={this.state.endTime}
          disabled={this.state.checked===this.props.day? false:true}
        />
          </div>

    </div>
    </div>
    <br/>
    </div>
  );
}

}

export default DayTime;
